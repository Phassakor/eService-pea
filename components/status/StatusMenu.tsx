"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/card";
import { FaListCheck } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import data from "@/public/status/status.json";
import { Button } from "@nextui-org/button";
import submenu from "@/public/submenu.json";
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
            <div className="z-40 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#8E0369] rounded-full p-2">
              <FaListCheck className=" text-white 2xl:w-12 w-8 2xl:h-12 h-8 2xl:p-1 p-1" />
            </div>
            <Card className="2xl:mx-28  2xl:rounded-lg lg:rounded-lg rounded-none">
              <CardBody className="p-0">
                <div className="font-NotoSansThai text-[#8E0369] text-center 2xl:text-xl text-lg font-bold 2xl:mt-12 mt-8 2xl:mb-8 mb-4">
                  ติดตามสถานะ
                </div>
                <div>
                  <div className="mx-0 2xl:grid 2xl:grid-cols-3 lg:grid-cols-3 grid grid-cols-2">
                    {data.map((d: any, index: any) => {
                      // console.log(data.length);
                      let url = d.url;
                      if (d.url === undefined) {
                        url = "/";
                      }
                      return (
                        <div
                          className={
                            index !== data.length - 1
                              ? "bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 lg:py-8 py-4 border-slate-200 border-r 2xl:border-b-none border-b"
                              : "bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 lg:py-8 py-4 border-slate-200 2xl:border-r-none border-r"
                          }
                          // className="bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 py-4 border-r border-slate-200"
                          key={index}
                          onClick={() =>
                            localStorage.setItem("otp", JSON.stringify(false))
                          }
                        >
                          <Link href={url}>
                            <div className="flex justify-center">
                              <Image
                                alt="Card background"
                                className="w-2/3"
                                width={200}
                                height={200}
                                src={d.logo}
                              />
                            </div>
                            <div className="flex justify-center">
                              <div className="font-NotoSansThai w-2/3 text-center 2xl:mt-6 mt-3 text-base ">
                                <div className="font-bold ">{d.title}</div>
                                {d.description !== "" ? (
                                  <div className="font-NotoSansThai font-regular 2xl:text-xs text-xxs mt-2">
                                    {d.description}
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
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
        <SearchMenu data={allMenu} searchText={searchInputText} />
      )}
    </>
  );
};

export default StatusMenu;
