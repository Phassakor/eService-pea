"use client";
import React, { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { GrAnnounce } from "react-icons/gr";
import { useAppSelector } from "@/redux/store";
import { formatDateThaiFull } from "@/utils/utils";
import { Pagination } from "@nextui-org/react";
import SearchMenu from "../SearchMenu";
import submenu from "@/public/submenu.json";

const AnnouncementList = (props: any) => {
  const data = useAppSelector((state) => state.carouselsReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const searchInputText = props.searchText;

  const allMenu: any = [];
  const allSubmenu = submenu.map((data, i) => {
    return data.map((data) => allMenu.push({ data }));
  });

  const PageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const ITEMS_PER_PAGE = 10;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <>
      {searchInputText === "" ? (
        <div className="2xl:mx-64 lg:mx-32 2xl:my-12 my-8">
          <div className="relative ">
            <div className="2xl:mx-28 lg:m-0 ml-2 font-NotoSansThai text-white 2xl:px-5 lg:px-5 px-3 2xl:py-3 py-2 bg-[#8E0369] inline-block rounded-tl-lg rounded-tr-lg lg:text-base text-sm">
              <div className="font-bold">ประกาศ</div>
            </div>
            <Card className="2xl:mx-28 rounded-tl-none lg:rounded-tr-lg 2xl:rounded-tr-lg rounded-tr-none 2xl:rounded-b-lg lg:rounded-b-lg rounded-b-none">
              <CardBody className="lg:p-8 p-0">
                <div>
                  <div className="mx-0">
                    {currentItems.map((d: any, index: any) => {
                      return (
                        <React.Fragment key={index}>
                          {d?.content_type === "linkout" ? (
                            <Link href={`${d.url}`} target="_blank">
                              <div
                                className={
                                  index !== data.length - 1
                                    ? "md:rounded bg-white border-b p-5 hover:bg-gray-50"
                                    : "md:rounded bg-white p-5 hover:bg-gray-50"
                                }
                              >
                                <div className="flex justify-between">
                                  <div className="flex font-NotoSansThai font-bold lg:text-xl text-xs">
                                    <GrAnnounce className="bg-[#8E0369] text-white 2xl:w-8 lg:w-6 w-4 2xl:h-8 lg:h-6 h-4 rounded-full 2xl:p-2 p-1 mr-2" />
                                    {d.name}
                                  </div>
                                  <div className="lg:text-sm text-xxs text-[#A0A0A0] font-NotoSansThai">
                                    {formatDateThaiFull(d.start_date)}
                                  </div>
                                </div>
                                <div className="lg:ml-10 ml-6 flex justify-between">
                                  <div className="font-NotoSansThai lg:text-base text-xxs 2xl:w-3/4 w-3/4 pt-2">
                                    เนื้อหาประกาศ{" "}
                                    {d?.description?.substring(0, 100)}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <Link href={`announce/${d.id}`}>
                              <div
                                className={
                                  index !== data.length - 1
                                    ? "md:rounded bg-white border-b p-5 hover:bg-gray-50"
                                    : "md:rounded bg-white p-5 hover:bg-gray-50"
                                }
                              >
                                <div className="flex justify-between">
                                  <div className="flex font-NotoSansThai font-bold lg:text-xl text-xs">
                                    <GrAnnounce className="bg-[#8E0369] text-white 2xl:w-8 lg:w-6 w-4 2xl:h-8 lg:h-6 h-4 rounded-full 2xl:p-2 p-1 mr-2" />
                                    {d.name}
                                  </div>
                                  <div className="lg:text-sm text-xxs text-[#A0A0A0] font-NotoSansThai">
                                    {formatDateThaiFull(d.start_date)}
                                  </div>
                                </div>
                                <div className="lg:ml-10 ml-6 flex justify-between">
                                  <div className="font-NotoSansThai lg:text-base text-xxs 2xl:w-3/4 w-3/4 pt-2">
                                    เนื้อหาประกาศ{" "}
                                    {d?.description?.substring(0, 100)}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              </CardBody>
            </Card>

            <div className="font-NotoSansThai flex justify-end 2xl:mx-28 mt-4">
              <Pagination
                total={totalPages}
                initialPage={currentPage}
                onChange={PageChange}
                color="secondary"
                showControls
              />
            </div>
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

export default AnnouncementList;
