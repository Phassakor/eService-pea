"use client";
import React, { useState, useCallback, useRef } from "react";
import Layout from "../layouts/LayoutForm";
import { CardHeader, CardBody, useDisclosure } from "@nextui-org/react";
import {
  InputForm,
  TextareaForm,
  DropdownSelect,
  ButtonGroup,
  CheckBox,
} from "../common/index";
import PersonalInfoForm from "./components/PersonalInfoForm";
import { IFormService, IAlertMsg } from "@/Interfaces/formInterface";
import { IDropdown } from "@/Interfaces/interface";
import { dataRenewableEnergy, dataTime } from "@/public/Data/dataForm";
import { createRequestForm, sendSms } from "@/api/apiServiceForm";
import { validateForm } from "@/utils/utils";
import useRedirect from "@/hooks/useRedirect";
import Loader from "@/components/Loader";
import AlertPopup from "@/components/common/modal/AlertPopup";
import { useSubmitHandler } from "@/hooks/formHooks";
import { useHandleRenewableType } from "@/hooks/masterData/masterDataFormHook";
import { ServiceFormProps } from "@/Interfaces/propsInterface";
export default function ServiceFormS329({ serviceId }: ServiceFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalAlert, setModalAlert] = useState<IAlertMsg>({
    type: "",
    open: false,
    msg: "",
    onConfirm: () => {},
  });
  const renewableList = useHandleRenewableType(serviceId || "");
  const renewableTypeList: IDropdown[] = [
    { label: "เลือกใบรับรองพลังงานหมุนเวียน", value: "" },
    ...renewableList,
  ];
  const [formData, setFormData] = useState<IFormService>({
    service_code: "S329",
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
    year: "",
    renewable_type: "",
    renewable_source_solar: false,
    renewable_source_wind: false,
    renewable_source_hydro: false,
    renewable_source_bio: false,
    renewable_source_all: false,
    renewable_source_other: false,
    renewable_source_other_detail: "",
  });
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const isCheckbox = type === "checkbox";
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => {
        if (name === "address_province" || name === "address_city") {
          return {
            ...prev,
            address_province:
              name === "address_province" ? value : prev.address_province,
            address_city: name === "address_province" ? "" : value,
            address_district: "",
          };
        } else if (name === "renewable_source_other") {
          return {
            ...prev,
            renewable_source_other: checked,
            renewable_source_other_detail: "",
          };
        } else {
          return {
            ...prev,
            [name]: isCheckbox ? checked : value,
          };
        }
      });
    },
    []
  );

  const redirectTo = useRedirect();
  const { handleSubmit, isSubmitting } = useSubmitHandler(async () => {
    const checkTime = formData.morning_flag || formData.afternoon_flag;
    if (validateForm(formRef.current) && checkTime) {
      setIsInvalid(false);
      const request = await createRequestForm(formData);
      const resultY3 = request?.data;
      if (request.status && resultY3?.result) {
        const onSendSms = await sendSms(formData.mobile_no || "", resultY3.sms);
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
            สนใจรับบริการ ขอซื้อขายใบรับรองการผลิตพลังงานหมุนเวียน
          </div>
        </CardHeader>
        <PersonalInfoForm
          formData={formData}
          onChange={handleInputChange}
          isInvalid={isInvalid}
        />

        <CardBody className="padding-card-body">
          <div className="text-sub-title-card">
            สำรวจความต้องการใบรับรองการผลิตพลังงานหมุนเวียน{" "}
            <span className="text-red-600">*</span>
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mt-5">
            <DropdownSelect
              label=""
              onChange={handleInputChange}
              dataList={renewableTypeList}
              isRequired={true}
              name="renewable_type"
              value={formData.renewable_type}
              isInvalid={isInvalid}
            />
          </div>
          <div className="text-sub-title-card my-5">
            แหล่งที่มาของพลังงานหมุนเวียนที่ต้องการ
            <br />
            (เลือกได้มากกว่า 1 ข้อ)
          </div>
          <div className="flex flex-col gap-6 mt-[26px] mb-3">
            {dataRenewableEnergy.map((item, index) => (
              <CheckBox
                type="checkbox"
                id={item.value}
                key={index}
                label={item.label}
                onChange={handleInputChange}
                name={item.name}
                value={item.value}
                isChecked={formData[item.name as keyof IFormService] as boolean}
              />
            ))}
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mb-5">
            <InputForm
              label="อื่นๆ"
              placeholder="อื่นๆ (โปรดระบุ)"
              isRequired={formData.renewable_source_other}
              name="renewable_source_other_detail"
              onChange={handleInputChange}
              disabled={!formData.renewable_source_other}
              value={formData.renewable_source_other_detail}
            />
          </div>
          <div className="text-sub-title-card my-5">
            ปีที่มีความต้องการใบรับรองการผลิตพลังงานหมุนเวียน
          </div>
          <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] pt-[20px] mb-[59px]">
            <InputForm
              label="จํานวน (กรอกข้อมูลเป็นหน่วย REC โดยที่การผลิตไฟฟ้าพลังงานสะอาด 1 MWh มีค่าเท่ากับ 1 REC)"
              placeholder="จํานวน"
              isRequired={true}
              name="qty"
              type="number"
              onChange={handleInputChange}
              value={formData.qty ?? 0 ? formData.qty?.toString() : ""}
              isInvalid={isInvalid}
            />
            <InputForm
              label="ปี โปรดระบุปี (พ.ศ.)"
              placeholder="ปี โปรดระบุปี (พ.ศ.)"
              isRequired={true}
              name="year"
              onChange={handleInputChange}
              value={formData.year}
              isInvalid={isInvalid}
            />
          </div>

          <div className="text-title-card mb-[11px]">
            ช่วงเวลาที่สะดวกให้ติดต่อกลับ
          </div>
          <div className="text-label">*สามารถเลือกได้มากกว่าหนึ่งตัวเลือก</div>
          <div className="box-card-time">
            <CheckBox
              type="checkbox"
              label={dataTime[0].label}
              onChange={handleInputChange}
              name="morning_flag"
              value={dataTime[0].value}
              isChecked={formData.morning_flag}
              isInvalid={
                (formData.morning_flag || formData.afternoon_flag) && isInvalid
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
                (formData.morning_flag || formData.afternoon_flag) && isInvalid
                  ? !isInvalid
                  : isInvalid
              }
            />
          </div>

          <div className="gap-[1.75rem_1.875rem]">
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
            pathRedirect="service/040a7286-49df-4c0a-4942-08dc8526f711"
            onConfirm={handleSubmit}
          />
        </CardBody>
      </form>
    </Layout>
  );
}
