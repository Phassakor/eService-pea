"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Layout from "../layouts/LayoutForm";
import { CardHeader, CardBody, useDisclosure } from "@nextui-org/react";
import {
  TextareaForm,
  CheckBox,
  ButtonGroup,
  InputForm,
  DropdownSelect,
  Modal,
} from "../common/index";
import PersonalInfoForm from "./components/PersonalInfoForm";
import { IDropdown } from "@/Interfaces/interface";
import { IFormService, IAlertMsg } from "@/Interfaces/formInterface";
import { dataTime, imageModalData } from "@/public/Data/dataForm";
import {
  createRequestForm,
  sendSms,
  getImageMiniO,
} from "@/api/apiServiceForm";
import { validateForm } from "@/utils/utils";
import useRedirect from "@/hooks/useRedirect";
import Loader from "@/components/Loader";
import { useHandleRequestService } from "@/hooks/masterData/masterDataFormHook";
import AlertPopup from "@/components/common/modal/AlertPopup";
import { useSubmitHandler } from "@/hooks/formHooks";
import { ServiceFormProps } from "@/Interfaces/propsInterface";
export default function ServiceFormS328({ serviceId }: ServiceFormProps) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [imageModal, setImageModal] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  // For AlertPopup
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onOpenChange: onAlertOpenChange,
  } = useDisclosure();

  // For ImageModal
  const {
    isOpen: isImageModalOpen,
    onOpen: onImageModalOpen,
    onOpenChange: onImageModalOpenChange,
  } = useDisclosure();

  const [modalAlert, setModalAlert] = useState<IAlertMsg>({
    type: "",
    open: false,
    msg: "",
    onConfirm: () => {},
  });

  const redirectTo = useRedirect();

  const [formData, setFormData] = useState<IFormService>({
    service_code: "S328",
    channel: 0,
    morning_flag: false,
    afternoon_flag: false,
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
    ca_no: "",
  });

  const requestServiceList = useHandleRequestService(serviceId || "");
  const serviceList: IDropdown[] = [
    { label: "เลือกความต้องการในการขอรับบริการ", value: "" },
    ...requestServiceList,
  ];

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
          onAlertOpen();
          return;
        }
        redirectTo();
      } else {
        setModalAlert({
          type: "E",
          open: true,
          msg: !request.status ? request.message : resultY3.msg,
        });
        onAlertOpen();
      }
    } else {
      setIsInvalid(true);
    }
  });

  const [imgModal, setImgModal] = useState<string[]>([]);
  const getImages = useCallback(async (imageName: string) => {
    try {
      const fetchData = await getImageMiniO(imageName);
      const objectUrl = URL.createObjectURL(fetchData);
      setImgModal((prev) => [...prev, objectUrl]);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }, []);
  useEffect(() => {
    getImages("Form/pic328-1.png");
    getImages("Form/pic328-2.png");
    return () => {
      imgModal.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);
  return (
    <Layout>
      {isSubmitting && <Loader />}
      <AlertPopup
        type={modalAlert.type}
        msg={modalAlert.msg}
        isOpen={isAlertOpen}
        onOpenChange={onAlertOpenChange}
      />
      <form ref={formRef}>
        <CardHeader className="padding-card-header">
          <div className="text-header-card">
            สนใจรับบริการ ออกแบบและติดตั้ง ระบบผลิตไฟฟ้าจากพลังงานแสงอาทิตย์
          </div>
        </CardHeader>
        <PersonalInfoForm
          formData={formData}
          onChange={handleInputChange}
          isInvalid={isInvalid}
        />
        <CardBody className="padding-card-body">
          <div className="gap-[1.75rem_1.875rem]">
            <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mt-[20px] mb-[30px]">
              <DropdownSelect
                label={"ความต้องการในการขอรับบริการ"}
                onChange={handleInputChange}
                dataList={serviceList}
                name="request_service"
                isRequired={true}
                value={formData.request_service}
                isInvalid={isInvalid}
              />
              <div className="flex flex-col text-right">
                <InputForm
                  label="หมายเลขผู้ใช้ไฟฟ้า (CA/Ref No.1) สำหรับผู้ใช้ไฟฟ้า กฟภ."
                  placeholder="หมายเลขผู้ใช้ไฟฟ้า"
                  name="ca_no"
                  type="text"
                  onChange={handleInputChange}
                  value={formData.ca_no}
                />
                <span
                  className="underline underline-offset-2 text-[var(--clr-indigo)] font-bold cursor-pointer mt-1"
                  onClick={() => {
                    setImageModal("CA");
                    onImageModalOpen();
                  }}
                >
                  วิธีดูหมายเลขผู้ใช้ไฟฟ้า
                </span>
              </div>
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
          <Modal
            isOpen={isImageModalOpen}
            onOpenChange={() => {
              onImageModalOpenChange();
              setImageModal("");
            }}
            title={
              imageModalData.find((x) => x.modalName === imageModal)?.title
            }
            pathImmage={imgModal}
          />
          <ButtonGroup
            pathRedirect="service/05b3d5e3-f136-40b8-3e96-08dc84fff09f"
            onConfirm={handleSubmit}
          />
        </CardBody>
      </form>
    </Layout>
  );
}
