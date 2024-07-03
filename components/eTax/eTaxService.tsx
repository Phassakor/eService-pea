"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { FaListCheck } from "react-icons/fa6";
import taxLogo from "@/app/asset/tax-logo.png";
import Link from "next/link";
import Image from "next/image";
import data from "@/public/status/status.json";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import submenu from "@/public/submenu.json";

import ModalQuotation from "../status/ModalQuotation";
import ETaxQuotation from "./eTaxQuotation";
import SearchMenu from "../SearchMenu";

const StatusMenu = (props: any) => {
  const searchInputText = props.searchText;

  const allMenu: any = [];
  const allSubmenu = submenu.map((data, i) => {
    return data.map((data) => allMenu.push({ data }));
  });

  return (
    <>
      {searchInputText === "" ? (
        <div className="2xl:mx-64 lg:mx-32 2xl:my-12 lg:my-12 my-8">
          <div className="relative">
            <div className="z-40 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8E0369] rounded-full  ">
              {/* <FaListCheck className=" text-white 2xl:w-12 w-8 2xl:h-12 h-8 2xl:p-1 p-1" /> */}
              <Image
                src={taxLogo.src}
                alt={"tax"}
                width={65}
                height={100}
              ></Image>
            </div>
            <Card className="2xl:mx-28  2xl:rounded-lg lg:rounded-lg rounded-none">
              <CardBody className="p-0">
                <div className="font-NotoSansThai text-[#8E0369] text-center 2xl:text-xl text-lg font-bold 2xl:mt-12 mt-8 2xl:mb-8 lg:mb-8 mb-4">
                  e-Tax
                </div>
                <div className="text-center mb-4 -mt-4 font-bold lg:inline hidden ">
                  ขอรับใบกำกับภาษีอิเล็กทรอนิกส์ (e-Tax)
                  สำหรับธุรกิจเกี่ยวเนื่อง
                </div>
                <div className="flex flex-col lg:mx-[210px] 2xl:mx-[420px] mx-8">
                  <div className=" mb-4">
                    <Input
                      radius="sm"
                      label="request no."
                      labelPlacement="outside"
                      variant="bordered"
                      placeholder="request no."
                    />
                  </div>
                  <div className="mt-2 font-NotoSansThai text-right lg:mb-16 mb-8">
                    {/* <Link href={"/"}>
                  <Button className="bg-[#8E0369] text-white py-4 2xl:px-6 rounded">
                    <FaSearch />
                    ค้นหา e-Tax
                  </Button>
                </Link> */}
                    <ETaxQuotation btnName={"ค้นหา e-Tax"} />
                  </div>
                </div>
              </CardBody>
            </Card>
            <div className="font-NotoSansThai text-center 2xl:mt-8 mt-6 lg:mb-32">
              <Link href={"/"}>
                <Button className="bg-[#8E0369] text-white py-4 2xl:px-8 rounded">
                  กลับสู่หน้าหลัก
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <SearchMenu data={allMenu} searchText={searchInputText} />
      )}
    </>
  );
};

export default StatusMenu;
