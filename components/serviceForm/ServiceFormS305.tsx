import React, { useState, useCallback, useRef } from "react";
import {
  IElectricTransformers,
  IFormService,
  ITransformer,
  IAlertMsg,
  SaveTransformer,
} from "@/Interfaces/formInterface";
import { IoIosAddCircle } from "react-icons/io";
import Layout from "../layouts/LayoutForm";
import { CardHeader, CardBody, useDisclosure } from "@nextui-org/react";
import {
  TextareaForm,
  DropdownSelect,
  CheckBox,
  Divider,
  ButtonGroup,
} from "../common/index";
import { IDropdown } from "@/Interfaces/interface";
import PersonalInfoForm from "./components/PersonalInfoForm";
import { useElectricTransformers } from "@/hooks/formHooks";
import { dataTime } from "@/public/Data/dataForm";
import {
  useHandleRequestService,
  useHandleRequestServiceType,
  useHandleTransformerBrand,
  useHandleTransformerPhase,
  useHandleTransformerSize,
  useHandleTransformerType,
  useHandleTransformerVoltage,
} from "@/hooks/masterData/masterDataFormHook";
import TransformerForm from "./components/TransformerForm";
import { createRequestForm, sendSms } from "@/api/apiServiceForm";
import { validateForm } from "@/utils/utils";
import useRedirect from "@/hooks/useRedirect";
import Loader from "@/components/Loader";
import AlertPopup from "@/components/common/modal/AlertPopup";
import { useSubmitHandler } from "@/hooks/formHooks";
import { ServiceFormProps } from "@/Interfaces/propsInterface";
export default function ServiceFormS305({ serviceId }: ServiceFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalAlert, setModalAlert] = useState<IAlertMsg>({
    type: "",
    open: false,
    msg: "",
    onConfirm: () => { },
  });
  const initialTransformers: IElectricTransformers[] = [
    {
      id: 1,
      status: "D",
      transformer_brand: "",
      transformer_phase: "",
      transformer_type: "",
      transformer_serial: "",
      transformer_size: "",
      transformer_voltage: "",
    },
  ];
  const transformers: ITransformer[] = [
    {
      transformer_brand: "",
      transformer_phase: "",
      transformer_type: "",
      transformer_serial: "",
      transformer_size: "",
      transformer_voltage: "",
    },
  ];
  const [isInvalid, setIsInvalid] = useState(false);
  const {
    electricTransformers,
    addTransformer,
    removeTransformer,
    updateTransformer,
  } = useElectricTransformers(initialTransformers);
  const requestServiceList = useHandleRequestService(serviceId || "");
  const requestSericeTypeList = useHandleRequestServiceType(serviceId || "");
  const brandList = useHandleTransformerBrand(serviceId || "");
  const phaseList = useHandleTransformerPhase(serviceId || "");
  const typeList = useHandleTransformerType(serviceId || "");
  const sizeList = useHandleTransformerSize(serviceId || "");
  const voltageList = useHandleTransformerVoltage(serviceId || "");
  const serviceList: IDropdown[] = [
    { label: "เลือกประเภทคำร้อง", value: "" },
    ...requestServiceList,
  ];
  const requestSericeType = [
    { label: "เลือกประเภทการให้บริการ", value: "" },
    ...requestSericeTypeList,
  ];
  const brand: IDropdown[] = [
    { label: "เลือกยี่ห้อ", value: "" },
    ...brandList.sort((a, b) => a.label.localeCompare(b.label, 'en')),
  ];


  // console.log("brand",brand);

  const phase: IDropdown[] = [{ label: "เลือกเฟส", value: "" }, ...phaseList];
  const type: IDropdown[] = [{ label: "เลือกประเภท", value: "" }, ...typeList];
  const size: IDropdown[] = [{ label: "เลือกประเภท", value: "" }, ...sizeList];
  const voltage: IDropdown[] = [{ label: "เลือกประเภท", value: "" }, ...voltageList];
  const [formData, setFormData] = useState<IFormService>({
    service_code: "S305",
    morning_flag: false,
    afternoon_flag: false,
    channel: 0,
    first_name: "",
    last_name: "",
    mobile_no: "",
    email: "",
    address: "",
    address_province: "",
    address_city: "",
    address_district: "",
    address_post_code: "",
    detail: "",
    request_service: "",
    request_service_type: "",
    transformers: transformers,
  });
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      if (name === "address_province" || name === "address_city") {
        setFormData((prev) => ({
          ...prev,
          address_province:
            name === "address_province" ? value : prev.address_province,
          address_city: name === "address_province" ? "" : value,
          address_district: "",
        }));
      } else {
        const inputValue: string | boolean =
          type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
        setFormData((prev) => ({
          ...prev,
          [name]: inputValue,
        }));
      }
    },
    []
  );
  const redirectTo = useRedirect();
  const { handleSubmit, isSubmitting } = useSubmitHandler(async () => {
    const checkTime = formData.morning_flag || formData.afternoon_flag;
    if (validateForm(formRef.current) && checkTime) {
      const dataToSave: SaveTransformer[] = electricTransformers.map(
        ({ id, status, ...rest }) => rest
      );
      const dataInsert = { ...formData, transformers: dataToSave };
      setIsInvalid(false);
      const request = await createRequestForm(dataInsert);
      const resultY3 = request?.data;
      if (request.status && resultY3?.result) {
        const onSendSms = await sendSms(
          dataInsert.mobile_no || "",
          resultY3.sms
        );
        if (!onSendSms.status) {
          setModalAlert({
            type: "E",
            open: true,
            msg: "หมายเลขโทรศัพท์ไม่ถูกต้อง กรุณาตรวจสอบอีกครั้ง",
            onConfirm: () => redirectTo(),
          });
          onOpen();
          return;
        }
        redirectTo();
      } else {
        setModalAlert({
          type: "E",
          open: true,
          msg: !request.status ? request.message : resultY3.msg,
        });
        onOpen();
      }
    } else {
      setIsInvalid(true);
    }
  });
  return (
    <Layout>
      {isSubmitting ? <Loader /> : <></>}
      <AlertPopup
        type={modalAlert.type}
        msg={modalAlert.msg}
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
        }}
      />
      <form ref={formRef}>
        <CardHeader className="padding-card-header">
          <div className="text-header-card">
            สนใจรับบริการ ขอบำรุงรักษาหม้อแปลงไฟฟ้า
          </div>
        </CardHeader>
        <PersonalInfoForm
          formData={formData}
          onChange={handleInputChange}
          isInvalid={isInvalid}
        />
        <CardBody className="padding-card-body pb-2">
          <div className="gap-[1.75rem_1.875rem] mb-[30px]">
            <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mt-[20px] mb-[30px]">
              <DropdownSelect
                label="ประเภทคำร้อง"
                onChange={handleInputChange}
                dataList={serviceList}
                isRequired={true}
                name="request_service"
                value={formData.request_service}
                isInvalid={isInvalid}
              />
              <div className="flex flex-col text-right">
                <DropdownSelect
                  label="ประเภทการให้บริการ"
                  onChange={handleInputChange}
                  isRequired={true}
                  dataList={requestSericeType}
                  name="request_service_type"
                  value={formData.request_service_type}
                  isInvalid={isInvalid}
                />
              </div>
            </div>
            {electricTransformers.map((transformer, index) => (
              <>
                {transformer.status === "N" && <Divider />}
                <TransformerForm
                  key={transformer.id}
                  transformer={transformer}
                  brands={brand}
                  phases={phase}
                  types={type}
                  size={size}
                  voltage={voltage}
                  onUpdate={updateTransformer}
                  onRemove={() => removeTransformer(transformer.id)}
                  numberOf={index + 1}
                  isInvalid={isInvalid}
                />
              </>
            ))}
            <div className="text-[var(--clr-indigo)] font-bold cursor-pointer pl-2">
              <div className="flex gap-2 items-center" onClick={addTransformer}>
                <IoIosAddCircle className="text-2xl" />
                เพิ่มหม้อแปลง
              </div>
            </div>
          </div>
          <div className="gap-[1.75rem_1.875rem]">
            <div className="text-title-card mb-[11px]">
              ช่วงเวลาที่สะดวกให้ติดต่อกลับ
            </div>
            <div className="text-label">
              *สามารถเลือกได้มากกว่าหนึ่งตัวเลือก
            </div>
            <div className="box-card-time">
              <CheckBox
                type="checkbox"
                label={dataTime[0].label}
                onChange={handleInputChange}
                name="morning_flag"
                value={dataTime[0].value}
                isChecked={formData.morning_flag}
                isInvalid={
                  (formData.morning_flag || formData.afternoon_flag) &&
                    isInvalid
                    ? !isInvalid
                    : isInvalid
                }
              />
              <CheckBox
                type="checkbox"
                label={dataTime[1].label}
                onChange={handleInputChange}
                name="afternoon_flag"
                value={dataTime[1].value}
                isChecked={formData.afternoon_flag}
                isInvalid={
                  (formData.morning_flag || formData.afternoon_flag) &&
                    isInvalid
                    ? !isInvalid
                    : isInvalid
                }
              />
            </div>
            <TextareaForm
              label="รายละเอียดเพิ่มเติม"
              placeholder="รายละเอียดเพิ่มเติม"
              onChange={handleInputChange}
              name="detail"
              value={formData.detail}
              height="min-h-[151px]"
              classBase="mt-10"
            />
          </div>
          <ButtonGroup
            pathRedirect="service/55451f8c-f620-4545-3ea6-08dc84fff09f"
            onConfirm={handleSubmit}
          />
        </CardBody>
      </form>
    </Layout>
  );
}
