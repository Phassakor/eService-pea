"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { IoSearch } from "react-icons/io5";
import Timer from "../Timer";
// import { updateOTPStatus, updateTimeStamp } from "@/reducers/Reducer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

const ModalReceipt = (props: any) => {
  const [isSend, setIsSend] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      {/* <Button
        className="bg-[#8E0369] text-white lg:text-base text-large font-NotoSansThai rounded lg:px-0 px-12 lg:py-0 py-6  "
        onPress={onOpen}
      >
        <div className="font-NotoSansThai font-semibold lg:px-8">
          {props.btnName}
        </div>
      </Button> */}
      <Button
        className="w-full bg-white text-black lg:text-base text-large font-NotoSansThai rounded-none font-light"
        onPress={onOpen}
      >
        <div className="">
          <MdOutlineEmail className="text-xl -ml-20 -mr-4" />
        </div>
        <div className="font-NotoSansThai font-semibold lg:px-2 -ml-16">
          {props.btnName}
        </div>
      </Button>
      <Modal
        placement="top-center"
        size="sm"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        className="shadow-sm shadow-white"
      >
        {!isSend ? (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="mt-4 -mb-4 flex flex-col gap-1 font-NotoSansThai text-[#8E0369] font-extrabold text-2xl">
                  รับใบเสร็จ
                </ModalHeader>
                <ModalBody className="font-NotoSansThai">
                  <p className="mb-2">กรุณาระบุอีเมลเพื่อรับใบเสร็จ</p>
                  <p className=" ">อีเมล</p>
                  <Input
                    className="w-full"
                    key={""}
                    radius="sm"
                    type="email"
                    placeholder="อีเมล"
                    variant="bordered"
                    size="sm"
                  />
                </ModalBody>
                <ModalFooter className="mb-4">
                  <Button
                    className="bg-[#C8CACB] text-white font-NotoSansThai rounded-lg"
                    onPress={() => {
                      onClose();
                    }}
                  >
                    <div className="font-NotoSansThai font-semibold text-lg px-4">
                      ยกเลิก
                    </div>
                  </Button>
                  <Button
                    className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
                    onPress={() => {
                      setIsSend(true);
                    }}
                  >
                    <div className="font-NotoSansThai font-semibold text-lg px-4">
                      ส่งอีเมล
                    </div>
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        ) : (
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="mt-2 -mb-4 flex flex-col gap-1 font-NotoSansThai  text-center font-extrabold text-2xl">
                  <div className=" ">
                    <RiCheckboxCircleFill
                      className="text-[#62C161] w-full mb-2"
                      size={70}
                    />
                    <div className="text-[#8E0369]">ขอใบเสร็จเรียบร้อย</div>
                  </div>
                </ModalHeader>
                <ModalBody className="font-NotoSansThai">
                  <p className="mb-2 text-center">
                    ระบบได้ดำเนินการส่งใบเสนอราคาของท่านไปที่อีเมล
                    กรุณาตรวจสอบที่กล่องข้อความ หากไม่ได้รับใบเสร็จ
                    กรุณาตรวจสอบในกล่องอีเมลขยะ
                  </p>
                </ModalBody>
                <ModalFooter className="flex justify-center mb-2">
                  <Button
                    className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
                    onPress={() => {
                      setIsSend(!isSend);
                      onClose();
                    }}
                  >
                    <div className="font-NotoSansThai font-semibold text-lg px-4">
                      ปิดหน้าต่างนี้
                    </div>
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        )}
      </Modal>
    </>
  );
};
export default ModalReceipt;
