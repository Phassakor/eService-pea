import React from "react";
import { Textarea } from "@nextui-org/react";
import { ITextareaFormProps } from "@/Interfaces/propsInterface";
export default function TextareaForm({
  label,
  isRequired = false,
  placeholder,
  type = "text",
  value,
  onChange,
  id,
  name,
  classBase,
  height = "min-h-[40px]",
  isInvalid,
  errorMessage,
}: ITextareaFormProps) {
  return (
    <Textarea
      isRequired={isRequired}
      label={label}
      radius="sm"
      variant="bordered"
      value={value}
      id={id}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      isInvalid={isInvalid && value ? !isInvalid : isInvalid}
      errorMessage={errorMessage}
      disableAnimation
      disableAutosize
      labelPlacement={"outside"}
      classNames={{
        base: `w-full ${classBase}`,
        input: `resize-y ${height}`,
        innerWrapper: `${height}`,
        inputWrapper:
          "border-input data-[hover]:border-[#8e0369] p-[12px_16px]",
        label: "z-7",
      }}
    />
  );
}
