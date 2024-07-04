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
  Modal,
} from "../common/index";
import PersonalInfoForm from "./components/PersonalInfoForm";
import { IFormService, IAlertMsg } from "@/Interfaces/formInterface";
import { IDropdown } from "@/Interfaces/interface";
import { dataTime } from "@/public/Data/dataForm";
import { useFileUpload, useSubmitHandler } from "@/hooks/formHooks";
import { imageModalData } from "@/public/Data/dataForm";
import { useHandleBusinessType } from "@/hooks/masterData/masterDataFormHook";
import {
  createRequestForm,
  sendSms,
  getImageMiniO,
} from "@/api/apiServiceForm";
import { validateForm } from "@/utils/utils";
import useRedirect from "@/hooks/useRedirect";
import Loader from "@/components/Loader";
import AlertPopup from "@/components/common/modal/AlertPopup";
import { ServiceFormProps } from "@/Interfaces/propsInterface";
export default function ServiceFormS303({ serviceId }: ServiceFormProps) {
  const { file, selectFile, deleteFile, setFileDrag, uploadFile, error } =
    useFileUpload();
  const [isInvalid, setIsInvalid] = useState(false);
  const businessType = useHandleBusinessType();
  const [imageModal, setImageModal] = useState<string>("");
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
  const businessTypeList: IDropdown[] = [
    { label: "เลือกประเภทธุรกิจ", value: "" },
    ...businessType,
  ];
  const formRef = useRef<HTMLFormElement>(null);
  const redirectTo = useRedirect();
  const [formData, setFormData] = useState<IFormService>({
    service_code: "S303",
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
    files: "",
    fileUpload: null,
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
  type ModalImg = {
    imgUrl: string;
    type: string;
  };
  const [imgModal, setImgModal] = useState<ModalImg[]>([]);
  const getImages = useCallback(async (imageName: string) => {
    try {
      const fetchData = await getImageMiniO(`Form/${imageName}`);
      const objectUrl = URL.createObjectURL(fetchData);
      const ttypeName =
        imageName === "mainbreaker1.png" || imageName === "mainbreaker2.png"
          ? "B"
          : "EW";
      setImgModal((prev) => [...prev, { imgUrl: objectUrl, type: ttypeName }]);
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  }, []);
  useEffect(() => {
    const imageNames = ["mainbreaker1.png", "mainbreaker2.png", "wire.png"];
    imageNames.forEach((imageName) => {
      getImages(imageName);
    });

    return () => {
      imgModal.forEach((modalImg) => URL.revokeObjectURL(modalImg.imgUrl));
    };
  }, [getImages]);
  return (
    <Layout>
      {isSubmitting ? <Loader /> : <></>}
      <AlertPopup
        type={modalAlert.type}
        msg={modalAlert.msg}
        isOpen={isAlertOpen}
        onOpenChange={() => {
          onAlertOpenChange();
        }}
      />
      <form ref={formRef}>
        <CardHeader className="padding-card-header">
          <div className="text-header-card">
            สนใจบริการ ขอตรวจสอบและบำรุงรักษาเคเบิล
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
            <div className="text-sub-title-card">แนบรูปภาพสถานที่ใช้ไฟฟ้า</div>
            <div className="w-full mb-10">
              <h2 className="text-lg">
                สามารถแนบไฟล์ได้เฉพาะไฟล์สกุล .jpg .png และ .pdf
              </h2>
              <div className="space-y-1 list-none">
                <div className="flex"> - หน้าบ้านตรง</div>
                <div className="flex">
                  - แนวสายไฟฟ้าเดิมจากเสาไฟฟ้าถึงตัวบ้าน (ดูภาพตัวอย่าง{" "}
                  <div
                    className="underline underline-offset-2 text-[var(--clr-indigo)] font-bold cursor-pointer pl-2"
                    onClick={() => {
                      setImageModal("EW");
                      onImageModalOpen();
                    }}
                  >
                    {" "}
                    สายไฟฟ้า
                  </div>
                  )
                </div>
                <div className="flex">- บริเวณที่จะติดตั้งเครื่องชาร์จ</div>
                <div className="flex">
                  - รูป Main Breaker (ดูภาพตัวอย่าง
                  <div
                    className="underline underline-offset-2 text-[var(--clr-indigo)] font-bold cursor-pointer pl-2"
                    onClick={() => {
                      setImageModal("B");
                      onImageModalOpen();
                    }}
                  >
                    {" "}
                    Main Breaker
                  </div>
                  )
                </div>
              </div>
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
          <Modal
            isOpen={isImageModalOpen}
            onOpenChange={() => {
              onImageModalOpenChange();
              setImageModal("");
            }}
            title={
              imageModalData.find((x) => x.modalName === imageModal)?.title
            }
            pathImmage={imgModal
              .filter((img) => img.type === imageModal)
              .map((img) => img.imgUrl)}
          />
          <ButtonGroup
            pathRedirect="service/5cc16c17-784b-47a8-3e9f-08dc84fff09f"
            onConfirm={handleSubmit}
          />
        </CardBody>
      </form>
    </Layout>
  );
}
