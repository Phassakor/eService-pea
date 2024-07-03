"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { FaListCheck } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import paotangIcon from "@/public/asset/paotang-logo.png";
import thaiIdIcon from "@/public/asset/thaiId-logo.png";
import listcheckIcon from "@/public/asset/listcheck-logo.png";
import { Input } from "@nextui-org/input";
import { IoSearch } from "react-icons/io5";
import ModalOTP from "./Modal";
import { CiCircleInfo } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import StatusTable from "./StatusTable";
import { Tooltip } from "@nextui-org/react";
import { updateOTPStatus } from "@/redux/Reducer";
import { updateRequestId } from "@/redux/Reducer";
import { connect } from "react-redux";
import { setVariable } from "@/store/action";
import { RootState } from "@/redux/store";
import { useSearchParams } from "next/navigation";
import { getRequestOTP } from "@/api/api";
import submenu from "@/public/submenu.json";
import SearchMenu from "../SearchMenu";

const StatusAuth = (props: any) => {
  const successOtp = useSelector((state: RootState) => state.Reducer.value);
  // const [viewTable, setViewTable] = useState(successOtp);
  // const [data, setData] = useState(localStorage.getItem("otp") || "false");
  const dispatch = useDispatch();

  let getFullURL = window.location.href;
  const getDomailUrl = getFullURL?.split("/status");
  // console.log(getDomailUrl[0]);

  let otpStatus;
  if (typeof window !== undefined) {
    otpStatus = localStorage.getItem("otp");
  }

  let requestIdValue;
  if (typeof window !== undefined) {
    requestIdValue = localStorage.getItem("requestId");
  }

  // useEffect(() => {
  //   console.log(successOtp);
  //   if (data === true) {
  //     localStorage.setItem("title", JSON.stringify(successOtp));
  //     dispatch(updateOTPStatus(true));
  //   } else {
  //     localStorage.setItem("title", JSON.stringify(successOtp));
  //   }
  // }, [successOtp]);

  const validateEmail = (value: any) => value.match(/^[0-9]*$/);

  const [requestId, setRequestId] = useState<any>("");
  const [phoneNumber, setPhoneNumber] = useState<any>("");

  const isInvalid = React.useMemo(() => {
    if (phoneNumber === "") return false;

    return validateEmail(phoneNumber) ? false : true;
  }, [phoneNumber]);

  // const [otpData, setOtpData] = useState<any>([])

  // const getOtp = async() => {
  //   console.log(phoneNumber);

  //   let dataOtp = await getRequestOTP(phoneNumber)

  //   if(dataOtp?.data) {
  //     setOtpData(dataOtp)
  //   }
  // }

  const searchInputText = props.searchText;

  const allMenu: any = [];
  const allSubmenu = submenu.map((data, i) => {
    return data.map((data) => allMenu.push({ data }));
  });

  useEffect(() => {
    dispatch(updateRequestId(requestId));
    localStorage.setItem("requestId", requestId);
  }, [requestId]);

  return (
    <>
      {searchInputText === "" ? (
        <>
          {otpStatus !== "true" ? (
            <div className="2xl:mx-64 2xl:my-12 my-8">
              <div className="relative">
                <div className="z-40 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8E0369] rounded-full p-2">
                  {/* <FaListCheck className=" text-white 2xl:w-12 w-8 2xl:h-12 h-8 2xl:p-1 p-1" /> */}
                  <Image
                    src={listcheckIcon}
                    width={0}
                    height={0}
                    className="text-white 2xl:w-12 w-10 2xl:h-12 h-10 2xl:p-2 p-2"
                    alt={"listcheckIcon"}
                  ></Image>
                </div>
                <Card className="2xl:mx-28 2xl:rounded-lg rounded-none">
                  <CardBody className="xl:p-12">
                    <div className="font-NotoSansThai text-[#8E0369] text-center lg:text-2xl text-xl font-bold lg:mt-4 mt-6 lg:mb-8 mb-4">
                      ติดตามสถานะ
                    </div>
                    <div className="flex lg:flex-row flex-col w-full ">
                      <div className="lg:w-1/2 xl:p-16 lg:p-4 p-4 xl:pt-4 lg:pt-4 pt-2 lg:border-r-1 lg:border-b-0 border-b-1">
                        <div className="text-center font-extrabold font-NotoSansThai lg:text-xl text-large">
                          ติดตามสถานะด้วย Digital ID
                        </div>
                        {/* <div className="flex justify-center mt-12">
                      <Button className="flex justify-start w-full border-1 bg-white p-6 rounded-lg">
                        <Image
                          className="-ml-4"
                          src={paotangIcon}
                          width={0}
                          height={0}
                          alt={"paotang icon"}
                        ></Image>
                        <div className="ml-4 font-NotoSansThai font-bold">
                          แอปพลิเคชันเป๋าตัง
                        </div>
                      </Button>
                    </div> */}
                        <Link
                          className="flex justify-center mt-4"
                          // href={'/status/business-status'}
                          // href={`https://imauthsbx.bora.dopa.go.th/api/v2/oauth2/auth/?response_type=code&client_id=bDNWUDBJYVNJVE4xNDhPRUhsTDdZSXNRM0RLZzl6WE4&redirect_uri=${getDomailUrl[0]}/status/business-status&scope=pid&state=this_is_random_string`}
                          href={`https://imauth.bora.dopa.go.th/api/v2/oauth2/auth/?response_type=code&client_id=WFJmVHM0bGY4bDhveXJmaEd5Wm5RV1VSdTJQejZKVHY&redirect_uri=https://cms-serviced-dev.pea.co.th/api/v1.0/FrontEnd/LoginY3ICSCallBack&scope=pid&state=PEA-CMS`}
                          onClick={() => {
                            // dispatch(updateRequestId(requestId));
                            // localStorage.setItem("requestId", requestId);
                          }}
                        >
                          <Button
                            className="flex justify-start w-full border-1 bg-white p-6 rounded-lg"
                            onPress={() => {
                              dispatch(updateOTPStatus(true));
                              localStorage.setItem("otp", JSON.stringify(true));
                            }}
                          >
                            <Image
                              className="-ml-4"
                              src={thaiIdIcon}
                              width={0}
                              height={0}
                              alt={"paotang icon"}
                            ></Image>
                            <div className="ml-4 font-NotoSansThai font-bold">
                              แอปพลิเคชัน ThaiD
                            </div>
                          </Button>
                        </Link>
                        <div className="bg-[#F6EBF3] mt-8 rounded-lg p-4 font-NotoSansThai">
                          <div>
                            <span className="font-bold">
                              สำหรับบุคคลธรรมดา{" "}
                            </span>
                            เข้าสู่ระบบด้วย Digital ID <br />
                            เพื่อใช้บริการระบบ ได้สะดวกและปลอดภัยยิ่งขึ้น
                          </div>
                          <div className="flex justify-between underline mt-8 font-semibold text-[#8E0369]">
                            <div className="cursor-pointer">
                              รายละเอียดเพิ่มเติม
                            </div>
                            <div className="cursor-pointer">
                              Digital ID คืออะไร
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-1/2 xl:p-16 p-4 xl:pt-4 lg:pt-4 pt-2 lg:mt-0 mt-4">
                        <div className="text-center font-extrabold font-NotoSansThai text-xl">
                          ติดตามสถานะผ่านระบบ e-Service
                        </div>
                        <div className="lg:mt-8 mt-4">
                          <div className="flex font-NotoSansThai">
                            <span>
                              เลขบัตรประชาชน / เลขนิติบุคคล / หมายเลขใบคำร้อง
                            </span>
                            <Tooltip
                              key={"bottom"}
                              placement={"bottom"}
                              className="opacity-80"
                              content={
                                <div className="px-1 py-2">
                                  <div className="font-NotoSansThai">
                                    <div>
                                      สามารถเลือกระบุข้อมูลต่อไปนี้
                                      เพื่อติดตามสถานะได้{" "}
                                    </div>
                                    <div>(*เพียงอย่างใดอย่างหนึ่ง*)</div>
                                    <br></br>
                                    <ul className="list-disc ml-6">
                                      <li>เลขบัตรประชาชน/ Passport No. </li>
                                      <li>
                                        เลขนิติบุคคล/ เลขประจำตัวผู้เสียภาษีอากร
                                      </li>
                                      <li>หมายเลขคำร้อง</li>
                                    </ul>
                                  </div>
                                </div>
                              }
                              color="foreground"
                            >
                              <div className="place-self-center ml-1 cursor-pointer">
                                <CiCircleInfo className="text-[#68326B]" />
                              </div>
                              {/* <Button
                          // variant="flat"
                          // className="capitalize"
                          // size="sm"
                          // color="foreground"
                          >
                            <CiCircleInfo className="place-self-center ml-1" />
                          </Button> */}
                            </Tooltip>
                          </div>
                          <Input
                            value={requestId}
                            onValueChange={setRequestId}
                            key={""}
                            radius="sm"
                            type="idCard"
                            placeholder="ID Card / Passport Number / Request No."
                            variant="bordered"
                            size="sm"
                          />
                        </div>
                        <div className="mt-8">
                          <label className="font-NotoSansThai">
                            เบอร์โทรศัพท์
                          </label>
                          <Input
                            value={phoneNumber}
                            onValueChange={setPhoneNumber}
                            key={""}
                            radius="sm"
                            type="idCard"
                            // label="ID Card / Passport Number / Request No."
                            // labelPlacement={"outside"}
                            placeholder="Mobile No."
                            variant="bordered"
                            size="sm"
                            // onChange={(e)=>setPhoneNumber(e?.target?.value)}
                            color={isInvalid ? "danger" : "success"}
                            isInvalid={isInvalid}
                            // errorMessage="Please enter a valid phone number"
                            // description={placement}
                          />
                          {isInvalid ? (
                            <div className="text-sm text-red-600">
                              Please enter a valid phone number
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="flex justify-end mt-4">
                          {/* <Button className="flex w-2/5 border-1 text-white bg-[#8E0369] lg:p-6 p-3 rounded-lg">
                    <IoSearch className="" />
                    <div className="font-NotoSansThai font-semibold text-lg">
                      ค้นหาสถานะ
                    </div>
                  </Button> */}
                          <ModalOTP
                            btnName={"ค้นหาสถานะ"}
                            phoneNumber={phoneNumber}
                          />
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
                <div className="font-NotoSansThai text-center 2xl:mt-8 mt-4">
                  <Link href={"/"}>
                    <Button className="bg-[#8E0369] text-white py-4 2xl:px-8 rounded">
                      กลับสู่หน้าหลัก
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <>
              <StatusTable requestId={requestId} />
            </>
          )}
        </>
      ) : (
        <SearchMenu data={allMenu} searchText={searchInputText} />
      )}
    </>
  );
};

export default StatusAuth;
