"use client";

import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { FaListCheck } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import paotangIcon from "@/public/asset/paotang-logo.png";
import thaiIdIcon from "@/public/asset/thaiId-logo.png";
import { Input } from "@nextui-org/input";
import { IoSearch } from "react-icons/io5";
import ModalOTP from "./Modal";
import { CiCircleInfo } from "react-icons/ci";
import { MdExpandMore } from "react-icons/md";
// import {
//   Table,
//   TableHeader,
//   TableColumn,
//   TableBody,
//   TableRow,
//   TableCell,
//   getKeyValue,
//   Accordion,
//   AccordionItem,
// } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { updateOTPStatus } from "@/redux/Reducer";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import StepProgressBar from "./StepProgressBar";
import ModalReceipt from "./ModalReceipt";
import ModalQuotation from "./ModalQuotation";
import data from "@/public/status/status_progress.json";
import TableExpandMobile from "./TableExpandMobile";
import { useParams } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import quotationLogo from "@/app/asset/quotation-logo.png";
import { TbFileDownload } from "react-icons/tb";
import receiptLogo from "@/app/asset/receipt-logo.png";
import { getRequestByGUID, getRequestList } from "@/api/api";
import { updateRequestId } from "@/redux/Reducer";
import submenu from "@/public/submenu.json";
import { updateEmail } from "@/api/api";
import { updateQuotation } from "@/api/api";

const StatusTableDetail = (props: any) => {
  const params = useParams();
  const dispatch = useDispatch();
  const [isContentVisible, setContentVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = useState(0); // index of list in table
  const [isLoad, setIsLoad] = useState(false);
  const [requestData, setRequestData] = useState<any>([]);
  const [requestGUIDData, setRequestGUIDData] = useState<any[]>([]);
  const [statusData, setStatusData] = useState<any>([]);
  const [statusTracking, setStatusTracking] = useState([]);

  let requestIdValue: any;
  if (typeof window !== undefined) {
    requestIdValue = localStorage.getItem("requestId");
    requestIdValue = requestIdValue?.replace('"', "");
  }

  const [requestId, setRequestId] = useState(requestIdValue);

  const fetchRequestData = async () => {
    requestIdValue = requestIdValue?.replace('"', "");

    setIsLoad(true);
    const requestListData = await getRequestList(requestIdValue);
    setIsLoad(false);

    if (requestListData?.result) {
      setRequestData(requestListData.datas ? requestListData.datas : []);
    }

    dispatch(updateRequestId(requestId));
    localStorage.setItem("requestId", requestId);
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  console.log(requestData);

  const fetchGUID = async (guid: any) => {
    const requestGUID = await getRequestByGUID(guid?.request_id);
    if (requestGUIDData?.length === 0)
      setRequestGUIDData(requestGUID.datas ? requestGUID.datas : []);
  };

  let count = 0;

  if (count === 0 && requestGUIDData?.length === 0) {
    let guid = requestData.find((d: any) => d?.request_no === params?.id);
    console.log(guid?.request_id);
    fetchGUID(guid);

    count++;
  }

  // console.log(requestGUIDData.requests?.status === "D");

  if (statusData?.length === 0) {
    let step = 0;
    for (let i = 0; i < requestData?.length; i++) {
      step = 0;

      if (
        requestData[i]?.status === "รับคำร้อง" ||
        requestData[i]?.status === "รอสร้างคำร้อง" ||
        requestData[i]?.status === "คำร้องจากช่องทางออนไลน์"
      ) {
        step = 1;
      } else if (
        requestData[i]?.status === "รอผลการสำรวจ" ||
        requestData[i]?.status === "รอสร้างใบเสนอราคา" ||
        requestData[i]?.status === "รออนุมัติ/ไม่อนุมัติ"
      ) {
        step = 2;
      } else if (requestData[i]?.status === "รอชำระเงิน") {
        step = 3;
      } else if (requestData[i]?.status === "รอขึ้น SAP") {
        step = 4;
      } else if (requestData[i]?.status === "ขึ้น SAP สมบูรณ์") {
        step = 5;
      } else if (requestData[i]?.status === "ขึ้น SAP ไม่สมบูรณ์") {
        step = 6;
      } else if (requestData[i]?.status === "ยกเลิก") {
        step = 1;
      }

      let statusTrackingData = [];
      let completeDate = requestData[i]?.updated_date
        ?.replace("T", " ")
        ?.split(".")[0];

      if (requestData[i]?.updated_date === null) {
        completeDate = requestData[i]?.created_date
          ?.replace("T", " ")
          ?.split(".")[0];
      }
      for (let j = 0; j < step; j++) {
        statusTrackingData.push({
          id: j + 1,
          complete_date: completeDate,
          success: true,
          cancel: requestData[i]?.status === "ยกเลิก" ? true : false,
        });
      }

      statusData.push({
        key: i + 1,
        no: requestData[i]?.request_no,
        name: requestData[i]?.service,
        status: requestData[i]?.status,
        created_date: requestData[i]?.created_date
          ?.replace("T", " ")
          ?.split(".")[0],
        updated_date: requestData[i]?.updated_date
          ?.replace("T", " ")
          ?.split(".")[0],
        status_tracking: statusTrackingData,
      });
    }
  }

  const content = (
    <PopoverContent className="p-0 w-[240px]">
      <div className="rounded-t w-full bg-[#4E4E4E] font-semibold text-white py-3 pl-4 p">
        รับใบเสนอราคา
      </div>
      <ModalQuotation
        btnName={"ผ่านทางอีเมล"}
        requestIdValue={requestIdValue}
      />
      <div className="bg-[#E4E6E8] w-full h-[1px]"></div>
      <Button
        className="w-full bg-white text-black lg:text-base text-large font-NotoSansThai rounded-none font-light"
        // onPress={onOpen}
      >
        <div className="">
          <TbFileDownload className="text-xl -ml-[76px] -mr-4" />
        </div>
        <div className="font-NotoSansThai font-semibold lg:px-2 -ml-[60px]">
          ดาวน์โหลดไฟล์
        </div>
      </Button>

      {/* <ModalReceipt btnName={"รับใบเสร็จ"} /> */}
      {/* <ModalQuotation btnName={"รับใบเสนอราคา2"} />
      <ModalReceipt btnName={"รับใบเสร็จ"} /> */}
    </PopoverContent>
  );

  const content2 = (
    <PopoverContent className="p-0 w-[240px]">
      <div className=" w-full bg-[#4E4E4E] font-semibold text-white py-3 pl-4 p">
        รับใบเสร็จ
      </div>
      <ModalReceipt btnName={"ผ่านทางอีเมล"} />
      <div className="bg-[#E4E6E8] w-full h-[1px]"></div>
      <Button
        className="w-full bg-white text-black lg:text-base text-large font-NotoSansThai rounded-b-md font-light"
        // onPress={onOpen}
      >
        <div className="">
          <TbFileDownload className="text-xl -ml-[76px] -mr-4" />
        </div>
        <div className="font-NotoSansThai font-semibold lg:px-2 -ml-[60px]">
          ดาวน์โหลดไฟล์
        </div>
      </Button>
      {/* <ModalReceipt btnName={"รับใบเสร็จ"} /> */}
      {/* <ModalQuotation btnName={"รับใบเสนอราคา2"} />
      <ModalReceipt btnName={"รับใบเสร็จ"} /> */}
    </PopoverContent>
  );

  // let filterData = data.filter((d) => d.no == params.id);
  let filterData = statusData.filter((d) => d.no == params.id);

  // const handleOpen = (clickedIndex) => {
  //   if (isOpenCollapse === clickedIndex) {
  //     setIsOpenCollapse(null);
  //   } else {
  //     setIsOpenCollapse(clickedIndex);
  //   }
  // };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const columns = [
  //   {
  //     key: "no",
  //     label: "หมายเลขใบคำร้อง",
  //   },
  //   {
  //     key: "name",
  //     label: "ชื่องาน",
  //   },
  //   {
  //     key: "status",
  //     label: "สถานะ",
  //   },
  //   {
  //     key: "created_date",
  //     label: "วันที่สร้างคำร้อง",
  //   },
  //   {
  //     key: "updated_date",
  //     label: "วันที่อัปเดตล่าสุด",
  //   },
  //   {
  //     key: "action",
  //     label: " ",
  //   },
  // ];

  let description = requestGUIDData?.all_status?.find(
    (d) => d?.code === requestGUIDData.requests.status
  );
  // console.log(description?.e_service_description);

  const searchInputText = props.searchText;

  const allMenu: any = [];
  const allSubmenu = submenu.map((data, i) => {
    return data.map((data) => allMenu.push({ data }));
  });

  return (
    <>
      {searchInputText === "" ? (
        <div className="2xl:mx-64 2xl:my-12 my-8">
          <div className="relative">
            <div className="z-40 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8E0369] rounded-full p-2">
              <FaListCheck className=" text-white 2xl:w-12 w-8 2xl:h-12 h-8 2xl:p-1 p-1" />
            </div>
            <Card className="2xl:mx-16 2xl:rounded-lg rounded-none">
              <CardBody className="xl:p-12">
                <div className="font-NotoSansThai text-[#8E0369] text-center lg:text-2xl text-xl font-bold lg:mt-4 mt-6 lg:mb-8 mb-4">
                  ติดตามสถานะ
                </div>
                <div className="ml-1 mb-2 flex">
                  <div className="text-[#667084]">ติดตามสถานะ</div>
                  <div className="text-[#8E0369] font-medium flex">
                    <IoIosArrowForward className="justify-center mt-1 font-black" />
                    <div>หมายเลขใบคำร้อง {params.id}</div>
                  </div>
                </div>

                <TableContainer className="border-1 lg:rounded-lg lg:block hidden ">
                  <Table
                    aria-label="collapsible table"
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableHead className="bg-[#8E0369]">
                      <TableRow>
                        <TableCell>
                          <div className="font-NotoSansThai text-white">
                            หมายเลขใบคำร้อง
                          </div>
                        </TableCell>
                        <TableCell
                          className=""
                          // colSpan={window.screen.width < 480 ? 2 : 1}
                        >
                          <div className="font-NotoSansThai text-white lg:col-auto col-span-2">
                            ชื่องาน
                          </div>
                        </TableCell>
                        <TableCell className="">
                          <div className="font-NotoSansThai text-white lg:table-cell hidden">
                            สถานะ
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-NotoSansThai text-white lg:table-cell hidden">
                            วันที่สร้างคำร้อง
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-NotoSansThai text-white lg:table-cell hidden">
                            วันที่อัปเดทล่าสุด
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-NotoSansThai text-white lg:table-cell hidden"></div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* <Row row={rows} /> */}
                      {filterData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row: any, index: any) => {
                          return (
                            <React.Fragment key={index}>
                              <TableRow key={index} className="">
                                <TableCell className="">
                                  <div className="font-NotoSansThai p-2">
                                    {row.no}
                                  </div>
                                </TableCell>
                                <TableCell className="lg:col-span-auto">
                                  <div className="font-NotoSansThai ">
                                    {row.name}
                                  </div>
                                </TableCell>
                                <TableCell className="lg:block hidden">
                                  <div className="lg:table-cell hidden font-NotoSansThai">
                                    {row.status}
                                  </div>
                                </TableCell>
                                <TableCell className="">
                                  <div className="font-NotoSansThai lg:table-cell hidden">
                                    {row.created_date}
                                  </div>
                                </TableCell>
                                <TableCell className="">
                                  <div className="font-NotoSansThai lg:table-cell hidden">
                                    {row.updated_date === undefined
                                      ? row.created_date
                                      : row.updated_date}
                                  </div>
                                </TableCell>
                                <TableCell className="">
                                  <div className="flex">
                                    <div className="   ">
                                      <div className="flex">
                                        <Popover
                                          size="lg"
                                          key="bottom-start"
                                          placement="bottom-start"
                                          color="default"
                                          radius="sm"
                                        >
                                          <PopoverTrigger>
                                            <Image
                                              className="cursor-pointer -ml-4 mr-4"
                                              src={quotationLogo?.src}
                                              width={16}
                                              height={16}
                                              alt={""}
                                            ></Image>
                                          </PopoverTrigger>
                                          {content}
                                          {/* {content2} */}
                                        </Popover>
                                        <Popover
                                          size="lg"
                                          key="bottom-start"
                                          placement="bottom-start"
                                          color="default"
                                          radius="sm"
                                        >
                                          <PopoverTrigger>
                                            <Image
                                              className="cursor-pointer mr-8"
                                              src={receiptLogo?.src}
                                              width={16}
                                              height={16}
                                              alt={""}
                                            ></Image>
                                          </PopoverTrigger>
                                          {/* {content} */}
                                          {content2}
                                        </Popover>
                                      </div>
                                    </div>
                                  </div>
                                </TableCell>
                                {/* <TableCell>
                              <div
                                className="hover:cursor-pointer"
                                // onClick={() => setOpen(!open)}
                                onClick={() => handleOpen(index)}
                              >
                                <MdExpandMore />
                              </div>
                            </TableCell> */}
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{ paddingBottom: 0, paddingTop: 0 }}
                                  colSpan={5}
                                >
                                  <Collapse
                                    in={isOpenCollapse === index}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <div className="w-[1050px]">
                                      <div className="lg:block hidden">
                                        <StepProgressBar
                                          statusTracking={row.status_tracking}
                                          guidData={requestGUIDData}
                                        />
                                      </div>
                                    </div>
                                    <hr style={{ margin: "0 70px 0 40px" }} />
                                    <div className="ml-16 mr-24 my-6">
                                      <div className="mb-4 text-justify">
                                        {description?.e_service_description}
                                      </div>
                                    </div>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* table mobile */}
                <TableContainer className="border-1 lg:rounded-lg lg:hidden rounded-t-lg">
                  <Table
                    aria-label="collapsible table"
                    sx={{
                      [`& .${tableCellClasses.root}`]: {
                        borderBottom: "none",
                      },
                    }}
                  >
                    <TableHead className="bg-[#8E0369]">
                      <TableRow>
                        <TableCell className="w-2/5">
                          <div className="font-NotoSansThai text-white">
                            หมายเลขใบคำร้อง
                          </div>
                        </TableCell>
                        <TableCell
                          className=""
                          // colSpan={window.screen.width < 480 ? 2 : 1}
                        >
                          <div className="font-NotoSansThai text-white lg:col-auto col-span-2">
                            ชื่องาน
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {/* <Row row={rows} /> */}
                      {filterData
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row, index) => {
                          return (
                            <React.Fragment key={index}>
                              <TableRow key={index} className="">
                                <TableCell className="">
                                  <div className="font-NotoSansThai p-2">
                                    {row.no}
                                  </div>
                                </TableCell>
                                <TableCell className="lg:col-span-auto">
                                  <div className="font-NotoSansThai ">
                                    {row.name.substring(0, 24)}...
                                  </div>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell
                                  style={{ paddingBottom: 0, paddingTop: 0 }}
                                  colSpan={6}
                                >
                                  <Collapse
                                    in={isOpenCollapse === index}
                                    timeout="auto"
                                    unmountOnExit
                                  >
                                    <div className="">
                                      <TableExpandMobile row={row} />
                                      <div className="font-NotoSansThai lg:text-right text-center lg:mt-4 my-6 lg:-mb-16">
                                        <div className="bg-[#FDFAFE] -mx-4 pb-3">
                                          <ModalQuotation
                                            btnName={"รับใบเสนอราคา"}
                                          />
                                          <ModalReceipt
                                            btnName={"รับใบเสร็จ"}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </Collapse>
                                </TableCell>
                              </TableRow>
                            </React.Fragment>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardBody>
            </Card>
            <div className="font-NotoSansThai text-center mt-8 ">
              <Link href={"/status/business-status"}>
                <Button className="bg-[#C7C7C7]  text-white lg:text-base text-large font-NotoSansThai rounded lg:mr-2 mr-4 lg:ml-0 ml-4 lg:px-8 px-12 lg:py-0 py-6">
                  ย้อนกลับ
                </Button>
              </Link>
              <Link href={"/"}>
                <Button className="bg-[#8E0369]    text-white lg:text-base text-large font-NotoSansThai rounded lg:mr-2 mr-4 lg:px-4 px-8 lg:py-0 py-6">
                  กลับสู่หน้าหลัก
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default StatusTableDetail;
