"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "../layouts/LayoutForm";
import { CardHeader, CardBody, useDisclosure } from "@nextui-org/react";
import {
  TextareaForm,
  DropdownSelect,
  CheckBox,
  InputUpload,
  ButtonGroup,
  InputForm,
} from "../common/index";
import PersonalInfoForm from "./components/PersonalInfoForm";
import { IFormService, IAlertMsg } from "@/Interfaces/formInterface";
import { IDropdown } from "@/Interfaces/interface";
import { dataTime } from "@/public/Data/dataForm";
import { useFileUpload, useSubmitHandler } from "@/hooks/formHooks";
import {
  createRequestForm,
  sendSms,
  equipmentType,
} from "@/api/apiServiceForm";
import { validateForm } from "@/utils/utils";
import useRedirect from "@/hooks/useRedirect";
import Loader from "@/components/Loader";
import { useHandleEquipmentType } from "@/hooks/masterData/masterDataFormHook";
import { ServiceFormProps } from "@/Interfaces/propsInterface";
import AlertPopup from "@/components/common/modal/AlertPopup";
export default function ServiceFormS301({ serviceId }: ServiceFormProps) {
  const { file, selectFile, deleteFile, setFileDrag, uploadFile, error } =
    useFileUpload();
  const [isInvalid, setIsInvalid] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalAlert, setModalAlert] = useState<IAlertMsg>({
    type: "",
    open: false,
    msg: "",
    onConfirm: () => {},
  });
  const equipmentType = useHandleEquipmentType(serviceId || "");
  const equipmentTypeList: IDropdown[] = [
    { label: "ประเภทอุปกรณ์ไฟฟ้า", value: "" },
    ...equipmentType,
  ];
  const formRef = useRef<HTMLFormElement>(null);
  const redirectTo = useRedirect();
  const [formData, setFormData] = useState<IFormService>({
    service_code: "S301",
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
    files: "",
    fileUpload: null,
    equipment_type: "",
    qty: 0,
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      fileUpload: file,
    }));
  }, [file]);

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

  const { handleSubmit, isSubmitting } = useSubmitHandler(async () => {
    const checkTime = formData.morning_flag || formData.afternoon_flag;
    const uploadResponse = await uploadFile();
    // Destructure formData to exclude fileUpload
    const { fileUpload, ...remainingFormData } = formData;
    // Create a new object with the updated files property
    const dataInsert = {
      ...remainingFormData,
      files: uploadResponse?.path ? uploadResponse.path : formData.files,
    };
    if (validateForm(formRef.current) && checkTime) {
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
        onConfirm={modalAlert.onConfirm}
        onOpenChange={() => {
          onOpenChange();
        }}
      />
      <form ref={formRef}>
        <CardHeader className="padding-card-header">
          <div className="text-header-card">
            สนใจรับบริการ ขอซ่อมแซมอุปกรณ์ไฟฟ้า
          </div>
        </CardHeader>
        <PersonalInfoForm
          formData={formData}
          onChange={handleInputChange}
          isInvalid={isInvalid}
        />
        <CardBody className="padding-card-body">
          <div className="gap-[1.75rem_1.875rem]">
            <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mb-[30px]">
              <DropdownSelect
                label={"ประเภทอุปกรณ์ไฟฟ้า"}
                onChange={handleInputChange}
                dataList={equipmentTypeList}
                name="equipment_type"
                value={formData.equipment_type}
                isRequired={true}
                isInvalid={isInvalid}
              />
              <InputForm
                label="จำนวน"
                placeholder="จำนวน"
                name="qty"
                type="number"
                onChange={handleInputChange}
                value={formData.qty ?? 0 ? formData.qty?.toString() : ""}
              />
            </div>
            <InputUpload
              onChange={selectFile}
              fileName={formData.fileUpload}
              onDelete={deleteFile}
              setFile={(e) => setFileDrag(e)}
              errorMsg={error || ""}
            />
            <div className="text-title-card mb-[11px] mt-[30px]">
              ช่วงเวลาที่สะดวกให้ติดต่อกลับ
            </div>
            <div className="text-label">
              * สามารถเลือกได้มากกว่าหนึ่งตัวเลือก
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
            pathRedirect="service/77b5de14-5d84-4df4-3ea8-08dc84fff09f"
            onConfirm={handleSubmit}
          />
        </CardBody>
      </form>
    </Layout>
  );
}
