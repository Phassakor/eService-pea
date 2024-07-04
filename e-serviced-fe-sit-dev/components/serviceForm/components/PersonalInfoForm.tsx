"use client";
import React, { useEffect } from "react";
import { CardBody } from "@nextui-org/react";
import {
  InputForm,
  TextareaForm,
  DropdownSelect,
  ButtonGroup,
  Divider,
} from "../../common/index";
import { IPersonalInfoFormProps } from "@/Interfaces/formInterface";
import { useAddressData, useSubmitHandler } from "@/hooks/formHooks";
export default function PersonalInfoForm({
  onChange = () => {}, // Provide a default no-op function
  formData,
  location,
  isInvalid,
}: IPersonalInfoFormProps) {
  const {
    province,
    districtList,
    subDistrictList: subDistrictListDropdown,
    postCode,
    onChangAddress,
  } = useAddressData();
  useEffect(() => {
    if (formData.address_province || !formData.address_province) {
      onChangAddress("address_province", formData.address_province);
    }
    if (formData.address_city) {
      onChangAddress("address_city", formData.address_city);
    }
    if (formData.address_district) {
      onChangAddress("address_district", formData.address_district);
    }
  }, [
    formData.address_province,
    formData.address_city,
    formData.address_district,
  ]);
  useEffect(() => {
    // Create a custom event-like object for the postal code update
    const customEvent = {
      target: {
        name: "address_post_code",
        value: postCode,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    // Update the formData's postal code when postCode state changes
    onChange(customEvent);
  }, [postCode, onChange]);

  return (
    <>
      <Divider />
      <CardBody className="padding-card-body">
        <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem]">
          <InputForm
            label="ชื่อ"
            placeholder="ชื่อ"
            isRequired={true}
            onChange={onChange}
            value={formData.first_name}
            name="first_name"
            isInvalid={isInvalid}
          />
          <InputForm
            label="นามสกุล"
            placeholder="นามสกุล"
            isRequired={true}
            name="last_name"
            onChange={onChange}
            value={formData.last_name}
            isInvalid={isInvalid}
          />
          <InputForm
            label="เบอร์ติดต่อ"
            placeholder="เบอร์ติดต่อ"
            isRequired={true}
            name="mobile_no"
            onChange={onChange}
            value={formData.mobile_no}
            isInvalid={isInvalid}
          />
          <InputForm
            label="อีเมล"
            placeholder="อีเมล"
            type="email"
            onChange={onChange}
            value={formData.email}
            name="email"
          />
        </div>
      </CardBody>
      <Divider />
      <CardBody className="padding-card-body">
        <div className="gap-[1.75rem_1.875rem]">
          <div className="text-title-card my-3">ที่อยู่สำหรับขอรับบริการ</div>
          {location && (
            <>
              <div className="text-sub-title-card mb-5">กรุณาระบุตำแหน่ง</div>
              <div className="h-[502px] bg-gray-200 mt-5"></div>
            </>
          )}

          <TextareaForm
            label="ที่อยู่"
            placeholder="ที่อยู่"
            isRequired={true}
            name="address"
            onChange={onChange}
            value={formData.address}
            classBase="mt-[33px]"
            isInvalid={isInvalid}
          />
          <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mt-[20px]">
            <DropdownSelect
              label={"จังหวัด"}
              isRequired={true}
              onChange={onChange}
              dataList={province}
              name="address_province"
              value={formData.address_province}
              isInvalid={isInvalid}
            />
            <DropdownSelect
              label={"เขต/อำเภอ"}
              isRequired={true}
              onChange={onChange}
              dataList={districtList}
              name="address_city"
              value={formData.address_city}
              isInvalid={isInvalid}
            />
            <DropdownSelect
              label="แขวง/ตำบล"
              isRequired={true}
              onChange={onChange}
              name="address_district"
              dataList={subDistrictListDropdown}
              value={formData.address_district}
              isInvalid={isInvalid}
            />
            <InputForm
              label="รหัสไปรษณีย์"
              placeholder="รหัสไปรษณีย์"
              isRequired={true}
              name="address_post_code"
              onChange={onChange}
              disabled
              value={formData.address_post_code || postCode || ""}
              isInvalid={isInvalid}
            />
          </div>
        </div>
      </CardBody>
      <Divider />
    </>
  );
}
