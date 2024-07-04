"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Layout from "../layouts/LayoutForm";
import {
  CardHeader, CardBody, useDisclosure, Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import {
  TextareaForm,
  DropdownSelect,
  CheckBox,
  ButtonGroup,
} from "../common/index";
import PersonalInfoForm from "./components/PersonalInfoForm";
import { IFormService, IAlertMsg } from "@/Interfaces/formInterface";
import { IDropdown } from "@/Interfaces/interface";
import { dataTime } from "@/public/Data/dataForm";
import { useHandleBusinessType } from "@/hooks/masterData/masterDataFormHook";
import { createRequestForm, sendSms } from "@/api/apiServiceForm";
import { validateForm } from "@/utils/utils";
import useRedirect from "@/hooks/useRedirect";
import Loader from "@/components/Loader";
import AlertPopup from "@/components/common/modal/AlertPopup";
import { useSubmitHandler } from "@/hooks/formHooks";
import { ServiceFormProps } from "@/Interfaces/propsInterface";
import { PiInfoLight } from "react-icons/pi";
import PackageModal from "./components/PackageModal";
import { getPackageService } from "@/api/api";

export default function ServiceFormS322({ serviceId }: ServiceFormProps) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [dataPackage, setdataPackage] = useState<any[]>([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [modalAlert, setModalAlert] = useState<IAlertMsg>({
    type: "",
    open: false,
    msg: "",
    onConfirm: () => { },
  });
  const businessType = useHandleBusinessType();
  const businessTypeList: IDropdown[] = [
    { label: "เลือกประเภทธุรกิจ", value: "" },
    ...businessType,
  ];
  const formRef = useRef<HTMLFormElement>(null);
  const redirectTo = useRedirect();
  const [formData, setFormData] = useState<IFormService>({
    service_code: "S322",
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
    business_type_id: "",
    detail: "",
    size_install: "",
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
        const { checked } = e.target as HTMLInputElement;

        const inputValue: string | boolean =
          type === "checkbox" && name !== "size_install"
            ? checked
            : name === "size_install" && !checked
              ? ""
              : value;
        setFormData((prev) => ({
          ...prev,
          [name]: inputValue,
        }));
      }
    },
    []
  );

  const { handleSubmit, isSubmitting } = useSubmitHandler(async () => {
    const checkTime =
      (formData.morning_flag || formData.afternoon_flag) &&
      formData.size_install;
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

  const OpenPackageModal = () => {
    setIsPackageModalOpen(true);
  };

  const ClosePackageModal = () => {
    setIsPackageModalOpen(false);
  };

  const getPackage = async (id: any) => {
    const dataService = await getPackageService(id);
    if (dataService?.data) {
      const data = dataService.data.map((item: any) => ({
        label: item.option_title,
        value: item.ics_id,
      }));
      setdataPackage(data);
    }
  };

  useEffect(() => {
    getPackage(serviceId);
  }, [serviceId]);

  return (
    <>
      <Layout>
        {isSubmitting ? <Loader /> : null}
        <AlertPopup
          type={modalAlert.type}
          msg={modalAlert.msg}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        />
        <form ref={formRef}>
          <CardHeader className="padding-card-header">
            <div className="text-header-card">
              สนใจรับบริการ ขอบำรุงรักษาระบบไฟฟ้าแบบครบวงจร (Package)
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
                  label="ประเภทธุรกิจ"
                  onChange={handleInputChange}
                  dataList={businessTypeList}
                  isRequired={true}
                  name="business_type_id"
                  value={formData.business_type_id}
                  isInvalid={isInvalid}
                />
              </div>
              <div className="text-sub-title-card mt-5 flex" >
                เลือก Package
                <span className="ml-2 flex items-center" onClick={OpenPackageModal} >
                  <PiInfoLight className="text-[#68326B]" />
                </span>
              </div>
              <div className="box-card-time">
                {dataPackage.length > 0 && (
                  dataPackage.map((item, index) => (
                    <CheckBox
                      type="radio"
                      key={index}
                      label={item.label}
                      onChange={handleInputChange}
                      name="size_install"
                      value={item.value}
                      isChecked={formData.size_install === item.value}
                      isInvalid={isInvalid && formData.size_install ? !isInvalid : isInvalid}
                    />
                  ))
                )}
              </div>

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
              pathRedirect="service/531bdf4a-59e7-46cf-3ea3-08dc84fff09f"
              onConfirm={handleSubmit}
            />
          </CardBody>
        </form>
      </Layout>
      {isPackageModalOpen && <PackageModal onClose={ClosePackageModal} ModalOpen={isPackageModalOpen} />}
    </>
  );
}
