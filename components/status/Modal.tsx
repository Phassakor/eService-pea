// "use client";
// import React, { useEffect, useState } from "react";
// import {RootState} from '@/redux/store'
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Modal,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Button,
//   useDisclosure,
//   Input,
// } from "@nextui-org/react";
// import { IoSearch } from "react-icons/io5";
// import Timer from "../Timer";
// import { updateOTPStatus, updateTimeStamp } from "@/redux/Reducer";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useParams } from "next/navigation";
// const ModalOTP = (props: any) => {

//   const params = useParams();
//   // console.log(params);

//   const expiredTime = useSelector((state:RootState) => state.Reducer.value as number);
//   // const [expiredTime, setExpiredTime] = useState(
//   //   useSelector((state) => state.answer.value)
//   // );

//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const seconds = 6;

//   let timeStamp = new Date(Date.now() + seconds * 1000);
//   const dispatch = useDispatch();

//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <Button
//         className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
//         onPress={onOpen}
//       >
//         <IoSearch className=" " />
//         <div className="font-NotoSansThai font-semibold text-lg">
//           {props.btnName}
//         </div>
//       </Button>
//       <Modal
//         placement="top-center"
//         size="sm"
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}
//         hideCloseButton={true}
//         className="shadow-sm shadow-white"
//       >
//         <ModalContent>
//           {(onClose) => (
//             <>
//               <ModalHeader className="mt-4 flex flex-col gap-1 font-NotoSansThai text-[#8E0369] font-extrabold text-2xl">
//                 ยืนยันรหัส OTP
//               </ModalHeader>
//               <ModalBody className="font-NotoSansThai">
//                 <p className="mb-2">
//                   ระบุ OTP ที่ได้รับทาง SMS ที่{" "}
//                   <span className="font-bold">087-xxx-0921</span>
//                 </p>
//                 <label className="font-NotoSansThai">รหัส OTP</label>
//                 <Input
//                   className="w-full"
//                   key={""}
//                   radius="sm"
//                   type="password"
//                   placeholder="OTP Code"
//                   variant="bordered"
//                   size="sm"
//                 />
//                 <Timer expiryTimestamp={timeStamp} />
//               </ModalBody>
//               <ModalFooter className="mb-4">
//                 <Button
//                   className="bg-[#C8CACB] text-white font-NotoSansThai rounded-lg"
//                   // onPress={onClose}
//                   onPress={() => {
//                     onClose();
//                     dispatch(updateTimeStamp({ count: count }));
//                     setCount(count + 1);
//                   }}
//                   // onClick={() => {
//                   //   dispatch(updateTimeStamp({ count: count }));
//                   //   setCount(count + 1);
//                   // }}
//                 >
//                   <div className="font-NotoSansThai font-semibold text-lg px-4">
//                     ยกเลิก
//                   </div>
//                 </Button>
//                 {expiredTime === "" ? (
//                   <Button
//                     className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
//                     // onPress={accessStatusTable}
//                     onPress={() => {
//                       dispatch(updateOTPStatus(true));
//                       localStorage.setItem("otp", JSON.stringify(true));
//                     }}
//                   >
//                     <div className="font-NotoSansThai font-semibold text-lg px-4">
//                       ตกลง
//                     </div>
//                   </Button>
//                 ) : (
//                   <Button
//                     className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
//                     onPress={() => {
//                       dispatch(updateTimeStamp({ count: count }));
//                       setCount(count + 1);
//                     }}
//                     // onClick={() => {
//                     //   dispatch(updateTimeStamp({ count: count }));
//                     //   setCount(count + 1);
//                     // }}
//                   >
//                     <div className="font-NotoSansThai font-semibold text-lg px-4">
//                       ขอรหัสใหม่
//                     </div>
//                   </Button>
//                 )}
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };
// export default ModalOTP;
import React, { useEffect, useState } from "react";
import { RootState } from "@/redux/store";
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
import { updateOTPStatus, updateTimeStamp } from "@/redux/Reducer";
import { useParams } from "next/navigation";
import { getRequestOTP } from "@/api/api";
import { verifyOTP } from "@/api/api";

const ModalOTP = (props: any) => {
  // console.log(props?.phoneNumber);

  let requestIdValue: any;
  if (typeof window !== undefined) {
    requestIdValue = localStorage.getItem("requestId");
    requestIdValue = requestIdValue?.replace('"', "");
  }

  // console.log(requestIdValue);

  const params = useParams();

  const expiredTime = useSelector(
    (state: RootState) => state.Reducer.value as boolean
  );

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const seconds = 6;

  let timeStamp = new Date(Date.now() + seconds * 1000);
  const dispatch = useDispatch();

  const [count, setCount] = useState(0);

  const [otpData, setOtpData] = useState<any>([]);

  const [otpCode, setOtpCode] = useState<any>("");

  const getOtp = async () => {
    // console.log(props?.phoneNumber);

    let dataOtp = await getRequestOTP(props?.phoneNumber);

    if (dataOtp?.data) {
      setOtpData(dataOtp);
    }
  };

  if (otpData?.length !== 0) {
    // console.log(otpData?.data?.oneTimePasswordId);
  }

  const [validOtp, setValidOtp] = useState<any>([]);
  const [countClick, setCountClick] = useState<any>(0);

  const verifyOtp = async () => {
    console.log(otpData?.data?.oneTimePasswordId);
    console.log(otpCode);

    setCountClick(countClick + 1);
    let checkOtp = await verifyOTP(otpData?.data?.oneTimePasswordId, otpCode);

    setValidOtp(checkOtp);
  };

  if (validOtp?.length !== 0) {
    console.log(validOtp);
    if (validOtp?.status === true) {
      dispatch(updateOTPStatus(true));
      localStorage.setItem("otp", JSON.stringify(true));
    }
  }

  // console.log(validOtp);

  return (
    <>
      <Button
        className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
        onPress={onOpen}
        onClick={
          props?.phoneNumber !== "" && requestIdValue !== ""
            ? () => getOtp()
            : () => { }
        }
      >
        <IoSearch className=" " />
        <div className="font-NotoSansThai font-semibold text-lg">
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
        <ModalContent>
          {(onClose) => (
            <>
              {props?.phoneNumber !== "" ? (
                <>
                  {requestIdValue === "" ? (
                    <>
                      <ModalHeader className="mt-4 flex flex-col gap-1 font-NotoSansThai text-[#8E0369] font-extrabold text-2xl">
                        ค้นหาสถานะ
                      </ModalHeader>
                      <ModalBody className="font-NotoSansThai">
                        <p className="mb-2">
                          กรุณากรอกเลขบัตรประชาชน / เลขนิติบุคคล /
                          หมายเลขใบคำร้อง !
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
                          onClick={() => onClose()}
                        >
                          <div className="font-NotoSansThai font-semibold text-lg px-4">
                            ตกลง
                          </div>
                        </Button>
                      </ModalFooter>
                    </>
                  ) : (
                    <>
                      <ModalHeader className="mt-4 flex flex-col gap-1 font-NotoSansThai text-[#8E0369] font-extrabold text-2xl">
                        ยืนยันรหัส OTP
                      </ModalHeader>
                      <ModalBody className="font-NotoSansThai">
                        <p>
                          ระบุ OTP ที่ได้รับทาง SMS ที่{" "}
                          {/* <span className="font-bold">087-xxx-0921</span> */}
                          <span className="font-bold">
                            {props?.phoneNumber?.substring(0, 3)}-xxx-
                            {props?.phoneNumber?.substring(6, 10)}
                          </span>
                        </p>
                        <p className="">
                          <b>Ref code:</b> {otpData?.data?.refCode}
                        </p>
                        <label className="font-NotoSansThai">รหัส OTP</label>
                        <Input
                          value={otpCode}
                          onValueChange={setOtpCode}
                          className="w-full"
                          classNames={{
                            inputWrapper: ["border-[#68326B]"],
                          }}
                          key={""}
                          radius="sm"
                          type="password"
                          placeholder="OTP Code"
                          variant="bordered"
                          size="sm"

                        />
                        <Timer expiryTimestamp={timeStamp} />
                        {countClick !== 0 && validOtp?.status === false ? (
                          <div className="text-sm -mt-4 text-red-600">
                            รหัส OTP ไม่ถูกต้อง
                          </div>
                        ) : (
                          <></>
                        )}
                      </ModalBody>
                      <ModalFooter className="mb-4">
                        <Button
                          className="bg-[#C8CACB] text-white font-NotoSansThai rounded-lg"
                          onPress={() => {
                            onClose();
                            dispatch(updateTimeStamp({ count: count }));
                            setCount(count + 1);
                          }}
                        >
                          <div className="font-NotoSansThai font-semibold text-lg px-4">
                            ยกเลิก
                          </div>
                        </Button>
                        {!expiredTime ? (
                          <Button
                            className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
                            // onPress={() => {
                            //   dispatch(updateOTPStatus(true));
                            //   localStorage.setItem("otp", JSON.stringify(true));
                            // }}

                            onClick={() => verifyOtp()}
                          >
                            <div className="font-NotoSansThai font-semibold text-lg px-4">
                              ตกลง
                            </div>
                          </Button>
                        ) : (
                          <Button
                            className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
                            onPress={() => {
                              dispatch(updateTimeStamp({ count: count }));
                              setCount(count + 1);
                            }}
                          >
                            <div className="font-NotoSansThai font-semibold text-lg px-4">
                              ขอรหัสใหม่
                            </div>
                          </Button>
                        )}
                      </ModalFooter>
                    </>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  {requestIdValue === "" ? (
                    <>
                      <ModalHeader className="mt-4 flex flex-col gap-1 font-NotoSansThai text-[#8E0369] font-extrabold text-2xl">
                        ค้นหาสถานะ
                      </ModalHeader>
                      <ModalBody className="font-NotoSansThai">
                        <p className="mb-2">กรุณากรอกข้อมูลให้ครบถ้วน!</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
                          onClick={() => onClose()}
                        >
                          <div className="font-NotoSansThai font-semibold text-lg px-4">
                            ตกลง
                          </div>
                        </Button>
                      </ModalFooter>
                    </>
                  ) : (
                    <>
                      <ModalHeader className="mt-4 flex flex-col gap-1 font-NotoSansThai text-[#8E0369] font-extrabold text-2xl">
                        ค้นหาสถานะ
                      </ModalHeader>
                      <ModalBody className="font-NotoSansThai">
                        <p className="mb-2">กรุณากรอกเบอร์โทรศัพท์!</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="bg-[#8E0369] text-white font-NotoSansThai rounded-lg"
                          onClick={() => onClose()}
                        >
                          <div className="font-NotoSansThai font-semibold text-lg px-4">
                            ตกลง
                          </div>
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalOTP;
