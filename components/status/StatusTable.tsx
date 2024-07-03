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
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import StepProgressBar from "./StepProgressBar";
import ModalReceipt from "./ModalReceipt";
import ModalQuotation from "./ModalQuotation";
import data from "@/public/status/status_progress.json";
import TableExpandMobile from "./TableExpandMobile";
import { getRequestList } from "@/api/api";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import quotationLogo from "@/app/asset/quotation-logo.png";
import { TbFileDownload } from "react-icons/tb";
import receiptLogo from "@/app/asset/receipt-logo.png";
import { updateRequestId } from "@/redux/Reducer";

const StatusTable = (props?: any) => {
  const dispatch = useDispatch();
  const [isContentVisible, setContentVisible] = useState(false);
  const [page, setPage] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [isOpenCollapse, setIsOpenCollapse] = useState(null); // index of list in table
  const [requestData, setRequestData] = useState([]);

  let getFullURL = window.location.href;
  const getDomailUrl = getFullURL?.split("?idcard=");

  console.log(getDomailUrl?.length);

  let requestIdValue: any;
  if (typeof window !== undefined) {
    requestIdValue = localStorage.getItem("requestId");
    requestIdValue = requestIdValue?.replace('"', "");
  }

  const [requestId, setRequestId] = useState(requestIdValue);

  if (getDomailUrl?.length > 1) {
    dispatch(updateRequestId(getDomailUrl[1]));
    localStorage.setItem("requestId", getDomailUrl[1]);
  }

  const fetchRequestData = async () => {
    console.log(props);
    requestIdValue = requestIdValue?.replace('"', "");
    // console.log(requestIdValue);

    if (getDomailUrl?.length > 1) {
      requestIdValue = getDomailUrl[1];
    }

    console.log(requestIdValue);

    setIsLoad(true);
    // const requestListData = await getRequestList(props?.requestId);
    const requestListData = await getRequestList(requestIdValue);
    setIsLoad(false);

    if (requestListData?.result) {
      setRequestData(requestListData.datas ? requestListData.datas : []);
    }

    dispatch(updateRequestId(requestId));
    localStorage.setItem("requestId", requestId);

    if (getDomailUrl?.length > 1) {
      dispatch(updateRequestId(getDomailUrl[1]));
      localStorage.setItem("requestId", getDomailUrl[1]);
    }
  };

  useEffect(() => {
    fetchRequestData();
  }, []);

  const content = (
    <PopoverContent className="p-0 w-[240px]">
      <div className="rounded-t w-full bg-[#4E4E4E] font-semibold text-white py-3 pl-4 p">
        รับใบเสนอราคา
      </div>
      <ModalQuotation btnName={"ผ่านทางอีเมล"} />
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

  console.log(requestData);

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

  return (
    <div className="2xl:mx-64 2xl:my-12 my-8">
      <div className="relative">
        <div className="z-40 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8E0369] rounded-full p-2">
          <FaListCheck className=" text-white 2xl:w-12 w-8 2xl:h-12 h-8 2xl:p-1 p-1" />
        </div>
        <Card className="2xl:mx-16 2xl:rounded-lg rounded-none">
          <CardBody className="xl:p-12 lg:-mb-8">
            <div className="font-NotoSansThai text-[#8E0369] text-center lg:text-2xl text-xl font-bold lg:mt-4 mt-6 lg:mb-8 mb-4">
              ติดตามสถานะ
            </div>
            <div className="ml-1 mb-2 text-[#667084]">ติดตามสถานะ</div>
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
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* <Row row={rows} /> */}
                  {requestData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index) => {
                      return (
                        <React.Fragment key={index}>
                          <TableRow key={index} className="">
                            <TableCell className="">
                              {/* <Link href={`business-status/${row.no}`}> */}
                              <Link href={`business-status/${row?.request_no}`}>
                                <div className="font-NotoSansThai p-2">
                                  {/* {row.no} */}
                                  {row?.request_no}
                                </div>
                              </Link>
                            </TableCell>

                            <TableCell className="lg:col-span-auto">
                              {/* <Link href={`business-status/${row.no}`}> */}
                              <Link href={`business-status/${row?.request_no}`}>
                                <div className="font-NotoSansThai ">
                                  {/* {row.name} */}
                                  {row?.service}
                                </div>
                              </Link>
                            </TableCell>

                            <TableCell className="lg:block hidden">
                              {/* <Link href={`business-status/${row.no}`}> */}
                              <Link href={`business-status/${row?.request_no}`}>
                                <div className="lg:table-cell hidden font-NotoSansThai">
                                  {row.status}
                                </div>
                              </Link>
                            </TableCell>

                            <TableCell className="">
                              {/* <Link href={`business-status/${row.no}`}> */}
                              <Link href={`business-status/${row?.request_no}`}>
                                <div className="font-NotoSansThai lg:table-cell hidden">
                                  {
                                    row?.created_date
                                      ?.replace("T", " ")
                                      ?.split(".")[0]
                                  }
                                </div>
                              </Link>
                            </TableCell>

                            <TableCell className="">
                              {/* <Link href={`business-status/${row.no}`}> */}
                              <Link href={`business-status/${row?.request_no}`}>
                                <div className="font-NotoSansThai lg:table-cell hidden">
                                  {
                                    row?.created_date
                                      ?.replace("T", " ")
                                      ?.split(".")[0]
                                  }
                                </div>
                              </Link>
                            </TableCell>

                            <TableCell className="">
                              <div className="flex">
                                <div className="-mr-6 ml-3 flex flex-wrap md:inline-grid  ">
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
                                          className="cursor-pointer mr-4"
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
                                          className="cursor-pointer"
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
                          {/* <TableRow>
                            <TableCell
                              style={{ paddingBottom: 0, paddingTop: 0 }}
                              colSpan={6}
                            >
                              <Collapse
                                in={isOpenCollapse === index}
                                timeout="auto"
                                unmountOnExit
                              >
                                <div className=" ">
                                  <div className="w-5/6 ml-20  lg:block hidden">
                                    <StepProgressBar
                                      statusTracking={row.status_tracking}
                                    />
                                  </div>
                                </div>
                                <div className="font-NotoSansThai lg:text-right text-center lg:mt-4 lg:mb-6">
                                  <ModalQuotation btnName={"รับใบเสนอราคา"} />
                                  <ModalReceipt btnName={"รับใบเสร็จ"} />
                                </div>
                              </Collapse>
                            </TableCell>
                          </TableRow> */}
                        </React.Fragment>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            {/* table mobile */}
            <TableContainer className="border-0 lg:rounded-lg lg:hidden rounded-lg">
              <Table
                aria-label="collapsible table"
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "1px solid #D6D6D6",
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
                  {requestData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index) => {
                      return (
                        <React.Fragment key={index}>
                          <TableRow key={index} className="">
                            <TableCell className="">
                              <Link href={`business-status/${row.request_no}`}>
                                <div className="font-NotoSansThai text-sm">
                                  {row.request_no}
                                </div>
                              </Link>
                            </TableCell>
                            <TableCell className="lg:col-span-auto">
                              <Link href={`business-status/${row.request_no}`}>
                                <div className="font-NotoSansThai text-sm">
                                  {/* {row.name.substring(0, 30)}... */}
                                  {row?.service}
                                </div>
                              </Link>
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
                                  <div className="font-NotoSansThai lg:text-right text-center lg:mt-4 lg:-mb-16">
                                    <div className="bg-[#FDFAFE] -mx-4 pb-3">
                                      <ModalQuotation
                                        btnName={"รับใบเสนอราคา"}
                                      />
                                      <ModalReceipt btnName={"รับใบเสร็จ"} />
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
            <TablePagination
              sx={{
                // ".Mui-disabled": {
                //   border: "1px solid #8e0369",
                //   color: "#8e0369",
                //   borderRadius: "5px",
                //   margin: "0 5px",
                // },

                ".MuiTablePagination-menuItem.Mui-selected": {
                  ":hover": {
                    backgroundColor: "blue",
                  },
                  backgroundColor: "purple",
                },
              }}
              className="mt-2"
              rowsPerPageOptions={[10]}
              component="div"
              // count={rows.length}
              // count={data.length}
              count={requestData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelDisplayedRows={function defaultLabelDisplayedRows({
                from,
                to,
                count,
              }) {
                return (
                  <div className="font-NotoSansThai font-semibold">
                    {from}–{to} จาก&nbsp;
                    {count !== -1 ? count : `more than ${to}`}
                  </div>
                );
              }}
            />
          </CardBody>
        </Card>
        <div className="font-NotoSansThai text-center mt-8">
          <Link href={"/status/business-status"}>
            <Button
              className="bg-[#C7C7C7] text-white py-4 2xl:px-8 rounded w-[150px] mr-4"
              onClick={() => localStorage.setItem("otp", JSON.stringify(false))}
            >
              ย้อนกลับ
            </Button>
          </Link>
          <Link href={"/"}>
            <Button className="bg-[#8E0369] text-white py-4 2xl:px-8 rounded w-[150px]">
              กลับสู่หน้าหลัก
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StatusTable;
