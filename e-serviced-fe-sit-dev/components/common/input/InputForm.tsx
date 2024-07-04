import React from "react";
import { Input } from "@nextui-org/react";
import { IInputFormProps } from "@/Interfaces/propsInterface";

export default function InputForm({
  label,
  isRequired = false,
  placeholder,
  type = "text",
  value,
  onChange,
  id,
  name,
  disabled = false,
  onClick,
  readonly,
  isClear,
  onClear,
  errorMessage,
  isInvalid,
}: IInputFormProps) {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === 'number') {
      const keyCode = event.code;
      const checkKeyCode = ["NumpadDecimal", "NumpadAdd", "NumpadSubtract"]
      if (checkKeyCode.includes(keyCode)) {
        event.preventDefault();
        return;
      }
    }
  };
  return (
    <>
      <Input
        isRequired={isRequired}
        isClearable={isClear}
        onClear={onClear}
        onClick={onClick}
        disabled={disabled}
        readOnly={readonly}
        onKeyDown={type === "number" ? handleKeyDown : undefined}
        key={"outside"}
        id={id}
        radius="sm"
        name={name}
        type={type}
        label={label}
        value={value ?? ""}
        onChange={onChange}
        variant="bordered"
        labelPlacement={"outside"}
        placeholder={placeholder}
        description={""}
        isInvalid={isInvalid && value ? !isInvalid : isInvalid}
        errorMessage={errorMessage}
        classNames={{
          base: "w-full",
          inputWrapper: [
            "border-input",
            "h-12",
            "py-3",
            "px-4",
            "data-[hover]:border-[#8e0369]",
          ],
          innerWrapper: "h-12",
          label: "z-7",
        }}
      />
    </>
  );
}
