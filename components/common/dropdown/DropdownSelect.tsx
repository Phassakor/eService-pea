"use client";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { IDropdownSelectProps } from "@/Interfaces/propsInterface";

export default function DropdownSelect({
  value,
  onChange,
  name,
  dataList = [],
  className,
  isRequired = false,
  disabled = false,
  label,
  placeholder,
  id,
  key = "",
  isInvalid,
  errorMessage,
}: IDropdownSelectProps) {
  return (
    <div className="flex w-full flex-col gap-2 h-20">
      <Select
        isDisabled={disabled}
        key={name}
        isRequired={isRequired}
        labelPlacement={"outside"}
        radius="sm"
        variant="bordered"
        label={label}
        placeholder={placeholder}
        defaultSelectedKeys={[""]}
        selectedKeys={[`${value}`]}
        isInvalid={isInvalid && value ? !isInvalid : isInvalid}
        errorMessage={errorMessage}
        classNames={{
          base: `w-full ${className}`,
          trigger: "pl-4 h-12 border-input data-[hover]:border-[#8e0369]",
          // trigger: `pl-4 h-12 border-input ${disabled ? 'data-[hover]:border-gray-300' : 'data-[hover]:border-[#8e0369]'}`,
          selectorIcon: "text-[#7718BC] text-base stroke-2",
          value: "text-[#000000]",
        }}
        value={value}
        name={name}
        onChange={onChange}
        disableAnimation
      >
        {dataList?.map((item, i) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
