"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import Submenu from "./Submenu";
import { MenuServeice } from "@/Interfaces/propsInterface";
import { getFile } from "@/api/api";

const SearchMenu = (props: any) => {
  const [search, setSearch] = useState<any[]>([]);
  const followStatus = [
    {
      name: "ติดตามสถานะ",
      icon: "/asset/submenu/8/menu-4.png",
      url: "/status",
    },
  ];
  const dataMenuAll = useAppSelector((state) => state.menuServiceReducer);
  const serviceAll = dataMenuAll.concat(followStatus);
  const data = serviceAll; //props.data;
  const searchText = props.searchText;
  let checkDup: any[] = [];

  function searchMenu(text: any) {
    let searchItem = data.filter((item) =>
      item.name?.toLowerCase().includes(text.trim().toLowerCase())
    );

    setSearch(searchItem);
    return searchItem;
  }
  useEffect(() => {
    searchMenu(searchText);
  }, [searchText]);
  const [menuIndex, setMenuIndex] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <div className="2xl:mt-6 lg:px-60 mx-2 mt-2 mb-12 rounded-md">
        <div className="shadow-lg 2xl:mx-28 2xl:grid 2xl:grid-cols-3 grid grid-cols-2">
          {search.map((data: any, index: any) => {
            // console.log(data);
            let url =
              data.content_type === "richtext"
                ? "/service/" + data.id
                : data.url;
            if (!data.url) {
              url = "/";
            }
            return (
              <div
                className="bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 py-4 border-r  border-b border-slate-200"
                key={index}
              >
                <Link
                  href={url}
                  target={
                    data.content_type !== "richtext" &&
                    data.open_mode === "newtab"
                      ? "_blank"
                      : ""
                  }
                >
                  <div className="flex justify-center">
                    <Image
                      alt="Card background"
                      className="w-2/3 lg:max-h-[285px]"
                      width={0}
                      height={0}
                      style={
                        isMobile
                          ? { width: "147.05px", height: "53.14px" }
                          : {
                              width: "285px",
                              // height: "285px",
                              height: "100px",
                              objectFit: "contain",
                            }
                      }
                      src={`${data.icon.replace("string", "")}`}
                    />
                  </div>
                  <div className="flex justify-center">
                    <div className="font-NotoSansThai w-2/3 text-center 2xl:mt-6 mt-3 font-bold lg:text-base text-xs">
                      {data.name}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
