"use client";
import React, { useState } from "react";
import { Checkbox } from "@nextui-org/react";
import { ICheckBoxProps } from "@/Interfaces/propsInterface";
export default function CheckBox({
  label,
  onChange,
  type,
  id,
  name,
  isChecked = false,
  value,
  isInvalid,
}: ICheckBoxProps) {
  const [isSelected, setIsSelected] = useState(isChecked);
  return (
    <div>
      <Checkbox
        type={type ? type : "checkbox"}
        isSelected={isSelected && isChecked}
        onValueChange={setIsSelected}
        id={id}
        radius="sm"
        isInvalid={isInvalid}
        name={name}
        onChange={onChange}
        value={value ?? ""}
        color="secondary"
        classNames={{
          wrapper: "h-6 w-6 mr-[14px] checked:bg-[--clr-indigo]",
        }}
      >
        {label}
      </Checkbox>
    </div>
  );
}
