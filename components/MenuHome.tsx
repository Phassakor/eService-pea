"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Submenu from "./Submenu";
import SearchMenu from "./SearchMenu";
import submenu from "@/public/submenu.json";
import { useAppSelector } from "@/redux/store";
import { Category } from "@/Interfaces/propsInterface";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { updateSelectedMenu } from "@/redux/Reducer";
import { updateSelectedSubmenu } from "@/redux/Reducer";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const MenuHome = (props: any) => {
  const searchInputText = props.searchText;
  const data = useAppSelector((state) => state.categoryReducer);
  const router = useRouter();

  let selectedMenuTemp: any;
  let selectedSubmenuTemp: any;
  if (typeof window !== undefined) {
    selectedMenuTemp = localStorage.getItem("selectedMenu");
    selectedSubmenuTemp = localStorage.getItem("selectedSubmenu");
  }

  const [selectedMenu, setSelectedMenu] = useState(selectedMenuTemp || false);
  const [menuIndex, setMenuIndex] = useState(selectedSubmenuTemp);
  const dispatch = useDispatch();

  const header = [
    "ลูกค้าบ้านอยู่อาศัย",
    "ลูกค้าธุรกิจ/อุตสาหกรรม/ราชการ",
    "บริการ EV และ Solar",
    "บริการทดสอบและสอบเทียบอุปกรณ์ไฟฟ้า",
    "บริการตรวจสอบและบำรุงรักษาระบบไฟฟ้า",
    "บริการจัดหาและให้เช่าอุปกรณ์ไฟฟ้า",
    "บริการก่อสร้างและติดตั้งระบบไฟฟ้า",
    "บริการอื่นๆ",
  ];
  const allMenu: any = [];
  const allSubmenu = submenu.map((data, i) => {
    return data.map((data) => allMenu.push({ data }));
  });
  const [isMobile, setIsMobile] = useState(false);

  let getFullURL = window.location.href;
  const getDomailUrl = getFullURL?.split("?menuId=");
  // console.log(getDomailUrl[1]);

  const handleClickMenu = (menuId: string, menuUrl: string) => {
    console.log(menuId);

    if (menuUrl) {
      window.open(menuUrl, "_blank");
    } else {
      // router.refresh();
      setSelectedMenu(true);
      setMenuIndex(menuId);
      dispatch(updateSelectedMenu(true));
      dispatch(updateSelectedSubmenu(menuId));
      router.push(`/?menuId=${menuId}`);
    }

    if (getDomailUrl[1] !== undefined) {
      setSelectedMenu(true);
      setMenuIndex(menuId);
      dispatch(updateSelectedMenu(true));
      dispatch(updateSelectedSubmenu(menuId));
      router.push(`/?menuId=${menuId}`);
    }
    // else {
    //   setMenuIndex(menuId);
    //   setSelectedMenu(true);

    //   dispatch(updateSelectedMenu(true));
    //   localStorage.setItem("selectedMenu", JSON.stringify(true));

    //   dispatch(updateSelectedSubmenu(menuId));
    //   localStorage.setItem("selectedSubmenu", menuId);
    // }
  };

  const params = useParams();
  console.log(params);

  useEffect(() => {
    console.log(props);

    if (props?.pageProps?.searchParams?.menuId) {
      let menuId = props?.pageProps?.searchParams?.menuId;
      // menuId = menuId?.replace("}", "");
      setSelectedMenu(true);
      setMenuIndex(menuId);
      dispatch(updateSelectedMenu(true));
      dispatch(updateSelectedSubmenu(menuId));
    }

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [props, handleClickMenu]);

  return (
    <>
      {data?.length <= 1 ? (
        <div className=" 2xl:mt-6 lg:px-60 mx-2 mt-2 lg:mb-72 mb-12 rounded-md"></div>
      ) : (
        <>
          {selectedMenu === false && searchInputText === "" ? (
            <div className=" 2xl:mt-6 lg:px-60 mx-2 mt-2 mb-12 rounded-md">
              <div className="shadow-lg 2xl:mx-28 2xl:grid   2xl:grid-cols-3 grid lg:grid-cols-3  grid-cols-2">
                {data?.map(async (x: any, i: Number) => (
                  <div
                    className="bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 lg:py-8 py-4 border-r  border-b border-slate-200"
                    onClick={() => handleClickMenu(x.id, x.url)}
                    key={x.id}
                  >
                    <div className="flex justify-center">
                      <Image
                        // alt="Card background"
                        alt={x?.name}
                        className="w-2/3 lg:max-h-[285px]"
                        width={0}
                        height={0}
                        style={
                          isMobile
                            ? { width: "147.05px", height: "53.14px" }
                            : {
                                width: "285px",
                                height: "100px",
                                objectFit: "contain",
                              }
                        }
                        src={x.icon || ""}
                      />
                    </div>
                    <div className="flex justify-center">
                      <div className="font-NotoSansThai w-2/3 text-center 2xl:mt-6 lg:mt-6 mt-3 font-bold lg:text-base text-xs">
                        {/* {x.name} */}
                        {x?.name?.length >= 40 ? (
                          <>
                            <a
                              data-tooltip-id="tooltip-name"
                              data-tooltip-content={x?.name}
                            >
                              {x?.name?.substring(0, 40)}...
                            </a>
                            <Tooltip id="tooltip-name" />
                          </>
                        ) : (
                          x?.name
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : selectedMenu === false && searchInputText !== "" ? (
            <SearchMenu data={allMenu} searchText={searchInputText} />
          ) : searchInputText === "" && menuIndex !== "" ? (
            <>
              {/* <Submenu
            header={header[menuIndex]}
            data={submenu}
            selected={menuIndex}
          /> */}
              <Submenu
                header={data.find((x) => x.id === menuIndex)?.name || ""}
                data={submenu}
                selected={menuIndex}
              />
              <Link className="flex justify-center mb-6" href={"/"}>
                <button
                  className="bg-[#8E0369] text-white rounded-md 2xl:px-12 lg:px-12 px-4 2xl:py-3 lg:py-3 py-1 font-medium font-NotoSansThai lg:text-[16px] text-xxs"
                  onClick={() => {
                    setSelectedMenu(false);
                    dispatch(updateSelectedMenu(false));
                    // localStorage.setItem("selectedMenu", JSON.stringify(false));
                    dispatch(updateSelectedSubmenu(""));
                    // localStorage.setItem("selectedSubmenu", "");
                    // redirect("/");
                  }}
                >
                  กลับสู่หน้าหลัก
                </button>
              </Link>
            </>
          ) : searchInputText !== "" ? (
            <SearchMenu data={allMenu} searchText={searchInputText} />
          ) : (
            <div className=" 2xl:mt-6 lg:px-60 mt-2 mb-12 mx-2 rounded-md">
              <div className="shadow-lg 2xl:mx-28 2xl:grid 2xl:grid-cols-3 grid lg:grid-cols-3 grid-cols-2">
                {data?.map(async (x: any, i: Number) => (
                  <div
                    className="bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 lg:py-8 py-4 border-r border-b border-slate-200"
                    onClick={() => handleClickMenu(x.id, x.url)}
                    key={x.id}
                  >
                    <div className="flex justify-center">
                      <Image
                        // alt="Card background"
                        alt={x?.name}
                        className="w-2/3"
                        width={0}
                        height={0}
                        style={
                          isMobile
                            ? { width: "147.05px", height: "53.14px" }
                            : {
                                width: "285px",
                                height: "100px",
                                objectFit: "contain",
                              }
                        }
                        src={x.icon || ""}
                      />
                    </div>
                    <div className="flex justify-center">
                      <div className="font-NotoSansThai w-2/3 text-center 2xl:mt-6 lg:mt-6 mt-3 font-bold lg:text-base text-xs">
                        {/* {x.name} */}
                        {x?.name?.length >= 40 ? (
                          <>
                            <a
                              data-tooltip-id="tooltip-name"
                              data-tooltip-content={x?.name}
                            >
                              {x?.name?.substring(0, 40)}...
                            </a>
                            <Tooltip id="tooltip-name" />
                          </>
                        ) : (
                          x?.name
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default MenuHome;
