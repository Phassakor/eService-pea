import React from "react";
import { Link, Button } from "@nextui-org/react";
interface Props {
  btnConfirm?: boolean; //for config show / hide
  buttonTextBack?: string;
  buttonTextConfirm?: string;
  onBack?: () => void;
  onConfirm?: () => void;
  pathRedirect?: string;
}

export default function ButtonGroup({
  btnConfirm,
  buttonTextBack = "ย้อนกลับ",
  buttonTextConfirm = "บันทึก",
  onBack,
  onConfirm,
  pathRedirect,
}: Props) {
  return (
    <div className="flex gap-[29px]">
      <Link href={`/${pathRedirect}`} className="w-[250px] mt-[30px]">
        <Button type="button" className="text-button bg-[var(--clr-gray)] h-12">
          {buttonTextBack}
        </Button>
      </Link>
      <div className="w-[250px] mt-[30px]">
        <Button
         type="button"
          className="text-button bg-[var(--clr-indigo)] h-12 data-[hover]:opacity-100 data-[hover]:bg-[#a30278]"
          onClick={onConfirm}
        >
          {buttonTextConfirm}
        </Button>
      </div>
    </div>
  );
}
