import React from "react";
import {RadioGroup, Radio} from "@nextui-org/react";

export default function RadioButton() {
  return (
    <RadioGroup
      label="Select your favorite city"
   color="secondary"
      classNames={{
        base:"rounded-none",
        wrapper: "checked:c-[#BEF264]",
        label:""
        
      }}
    >
      <Radio value="buenos-aires">Buenos Aires</Radio>
      <Radio value="sydney">Sydney</Radio>
      <Radio value="san-francisco">San Francisco</Radio>
      <Radio value="london">London</Radio>
      <Radio value="tokyo">Tokyo</Radio>
    </RadioGroup>
  );
}
