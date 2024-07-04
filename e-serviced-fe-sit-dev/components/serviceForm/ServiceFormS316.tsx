"use client";
import React, { useState, useCallback, useRef } from "react";
import Layout from "../layouts/LayoutForm";
import { CardHeader, CardBody, useDisclosure } from "@nextui-org/react";
import {
  InputForm,
  TextareaForm,
  CheckBox,
  ButtonGroup,
  DatePickerMuti,
} from "../common/index";
import PersonalInfoForm from "./components/PersonalInfoForm";
import { IFormService, IAlertMsg } from "@/Interfaces/formInterface";
import { dataTime } from "@/public/Data/dataForm";
import { useSubmitHandler } from "@/hooks/formHooks";
import useRedirect from "@/hooks/useRedirect";
import { diffDate, validateForm, convertDateFormat } from "@/utils/utils";
import Loader from "@/components/Loader";
import { createRequestForm, sendSms } from "@/api/apiServiceForm";
import AlertPopup from "@/components/common/modal/AlertPopup";
import { ServiceFormProps } from "@/Interfaces/propsInterface";
export default function ServiceFormS316({ serviceId }: ServiceFormProps) {
  const redirectTo = useRedirect();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [totalDate, setTotaldate] = useState<number | null>();
  const [isInvalid, setIsInvalid] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null);
  const [modalAlert, setModalAlert] = useState<IAlertMsg>({
    type: "",
    open: false,
    msg: "",
    onConfirm: () => {},
  });
  const [formData, setFormData] = useState<IFormService>({
    service_code: "S316",
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
    kw_size: 0,
    qty: 0,
    detail: "",
    rental_startdate: "",
    rental_enddate: "",
    days: 0,
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

  const handleChangeDate = (validatedValue: string) => {
    if (validatedValue) {
      const dateSelect = validatedValue?.split(",");
      let start = dateSelect?.[0];
      let end = dateSelect?.[1];
      setStartDate(start);
      setEndDate(end);
      if (start && end) {
        let i = diffDate(convertDateFormat(start), convertDateFormat(end));

        setTotaldate(i);
      } else {
        setTotaldate(null);
      }
    } else {
      setStartDate("");
      setEndDate("");
      setTotaldate(null);
    }
  };
  const { handleSubmit, isSubmitting } = useSubmitHandler(async () => {
    //new DateObject(val).format("YYYY-MM-DD HH:mm:ss")
    const checkTime =
      (formData.morning_flag || formData.afternoon_flag) &&
      startDate &&
      endDate;
    if (validateForm(formRef.current) && checkTime) {
      setIsInvalid(false);
      const dataInsert = {
        ...formData,
        rental_startdate: startDate ?? formData.rental_startdate,
        rental_enddate: endDate ?? formData.rental_enddate,
        days: totalDate ?? formData.days,
      };
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
            ขนาดเครื่องกำเนิดไฟฟ้าที่ต้องการ
          </div>
        </CardHeader>
        <PersonalInfoForm
          formData={formData}
          onChange={handleInputChange}
          isInvalid={isInvalid}
        />

        <CardBody className="padding-card-body">
          <div className="gap-[1.75rem_1.875rem]">
            <div className="text-sub-title-card mb-5">
              ขนาดเครื่องกำเนิดไฟฟ้าที่ต้องการ
            </div>
            <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mb-[28px] mt-3">
              <InputForm
                label="จำนวน kW"
                placeholder="จำนวน kW"
                type="number"
                name="kw_size"
                onChange={handleInputChange}
                value={
                  formData.kw_size ?? 0 ? formData.kw_size?.toString() : ""
                }
              />
              <InputForm
                label="จำนวนเครื่อง"
                placeholder="จำนวนเครื่อง"
                type="number"
                name="qty"
                onChange={handleInputChange}
                value={formData.qty ?? 0 ? formData.qty?.toString() : ""}
              />
            </div>
          </div>
          <div className="gap-[1.75rem_1.875rem]">
            <div className="grid grid-cols-2 max-md:grid-cols-1 sm:grid-cols gap-[1.75rem_1.875rem] mb-[30px] mt-3">
              <div className="relative flex gap-2 max-md:flex-col max-md:gap-[1.875rem]">
                <DatePickerMuti
                  onChangeDate={handleChangeDate}
                  valueStartDate={startDate}
                  valueEndDate={endDate}
                  numberOfDiffDate={totalDate}
                  isInvalid={isInvalid}
                  onClearStart={() => {
                    setStartDate("");
                    setTotaldate(undefined);
                  }}
                  onClearEnd={() => {
                    setEndDate("");
                    setTotaldate(undefined);
                  }}
                />
                <div className="">
                  <InputForm
                    label="จำนวนวัน"
                    placeholder="จำนวนวัน"
                    readonly={true}
                    disabled={true}
                    name="numberOfDays"
                    value={totalDate?.toString()}
                  />
                </div>
              </div>
            </div>
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
          <TextareaForm
            label="รายละเอียดเพิ่มเติม"
            placeholder="รายละเอียดเพิ่มเติม"
            onChange={handleInputChange}
            name="detail"
            value={formData.detail}
            height="min-h-[151px]"
            classBase="mt-10"
          />

          <ButtonGroup pathRedirect="" onConfirm={handleSubmit} />
        </CardBody>
      </form>
    </Layout>
  );
}
