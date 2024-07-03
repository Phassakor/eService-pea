"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAppSelector } from "@/redux/store";
import logoMenuFollow from "@/public/asset/submenu/8/menu-4.png";
import { getFile } from "@/api/api";
import { MenuServeice } from "@/Interfaces/propsInterface";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useRouter } from "next/navigation";

const Submenu = (props: any) => {
  const router = useRouter();

  const serviceAll = useAppSelector((state) => state.menuServiceReducer);
  const data = serviceAll.filter(
    (x) => x.fk_master_categories_id === props.selected
  );
  // const data = props.data[props.selected + 1];
  const header = props.header;
  const followStatus = {
    title: "ติดตามสถานะ",
    logo: "/asset/submenu/8/menu-4.png",
    url: "/status",
  };
  const [processedData, setProcessedData] = useState<MenuServeice[]>([]);
  // useEffect(() => {
  //   if (data && data.length > 0) {
  //     transformSubmenu();
  //   }
  // }, []);

  // const transformSubmenu = async () => {
  //   const menus: MenuServeice[] = [];

  //   for (const item of data) {
  //     if (item.icon) {
  //       const imageUrl = await GetImage(item.icon);
  //       menus.push({ ...item, icon: imageUrl });
  //     } else {
  //       menus.push(item);
  //     }
  //   }
  //   setProcessedData(menus);
  // };

  // const GetImage = async (url: string): Promise<string | undefined> => {
  //   if (url && url != '') {
  //     const file = await getFile(url);
  //     if (file) {
  //       const namefile = url.replace('/CMS/', '');
  //       const files = new File([file], namefile, { type: file.type });
  //       return URL.createObjectURL(files);
  //     }
  //   }
  //   return undefined;
  // };

  const [isMobile, setIsMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth < 768);
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => window.removeEventListener('resize', handleResize);
  // }, []);

  /**
   *
   *
   */
  const maxLength = 40;
  const truncateString = (str: string, maxLength: number) => {
    if (str.length <= maxLength) return str;
    const truncated = str.split('(')[0].trim();
    return truncated.length <= maxLength ? truncated : truncated.slice(0, maxLength) + '...';
  };
  
  // const splitName = (name: string) => {
  //   const parts = name.split('(');
  //   if (parts.length > 1) {
  //     return (
  //       <>
  //         {parts[0].trim()} <br/> ({parts[1]}
  //       </>
  //     );
  //   }
  //   return name;
  // };

  return (
    <div>
      <div className=" lg:px-60 mx-2 2xl:mt-6 lg:mt-6 mt-2 mb-6">
        <div className="2xl:mx-28 ml-2 font-NotoSansThai text-white 2xl:px-5 px-3 2xl:py-3 py-2 bg-[#8E0369] inline-block rounded-tl-lg rounded-tr-lg lg:text-[24px] text-sm">
          <div className="font-bold">{header}</div>
        </div>
        <div className="shadow-lg 2xl:mx-28 2xl:grid 2xl:grid-cols-3 lg:grid-cols-3 grid grid-cols-2 rounded-b-[16px] rounded-r-[16px] overflow-hidden">
          <>
            {data.map(async (item: any, index: any) => {
              let url =
                item.content_type === "richtext"
                  ? "/service/" + item.id
                  : item.url;
              if (!item.url) {
                url = "/";
              }

              return (
                <div
                  className="bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 lg:py-8 py-4 border-r  border-b border-slate-200"
                  key={index}
                >
                  <div
                    // href={url}
                    // target={
                    //   item.content_type !== "richtext" &&
                    //   item.open_mode === "newtab"
                    //     ? "_blank"
                    //     : ""
                    // }
                    onClick={() => {
                      router.push(url, { scroll: false });
                    }}
                  >
                    <div className="flex justify-center">
                      <Image
                        alt="Card background"
                        className="w-2/3"
                        width={0}
                        height={0}
                        style={
                          isMobile
                            ? { width: "147.05px", height: "53.14px" }
                            : {
                                width: "285px",
                                // height: "285px",
                                height: "100px",
                                 padding:"0 20px",
                                objectFit: "contain",
                              }
                        }
                        // alt="Card background"
                        // className="w-2/3"
                        // width={0}
                        // height={0}
                        // style={isMobile ? { width: '147.05px', height: '53.14px' } : { width: '285px', height: '103px' }}
                        src={item.icon || ""}
                      />
                    </div>
                    <div className="flex justify-center">
                      <div className="font-NotoSansThai w-2/3 text-center 2xl:mt-6 lg:mt-6 mt-3 lg:text-[18px] text-xs">
                        <div className="font-bold ">
                          {/* {item.name} */}
                          {/* {item?.name?.substring(0, 40)}... */}
                          {/* {item?.name?.length >= 80 ? (
                          <>
                            <a
                              data-tooltip-id="tooltip-name"
                              data-tooltip-content={item?.name}
                            >
                              {truncateString(item?.name || '', 80)}
                            </a>
                            <Tooltip id="tooltip-name" />
                          </>
                        ) : (
                          splitName(item?.name || '')
                        )} */}
                          {item?.name?.length >= 40 ? (
                          <>
                            <a
                              data-tooltip-id="tooltip-name"
                              data-tooltip-content={item?.name}
                            >
                                {item?.name?.substring(0, 40)}...
                                {/* {truncateString(item?.name || '', maxLength)} */}
                            </a>
                            <Tooltip id="tooltip-name" />
                          </>
                        ) : (
                            item?.name
                        )}
                        
                        </div>
                        {item.description !== "" ? (
                          <div className="font-NotoSansThai font-regular lg:text-[14px] text-xxs mt-2">
                            {item.description}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {/* <div className="bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 py-4 border-r  border-b border-slate-200">
              <Link href={followStatus.url} target={"_blank"}>
                <div className="flex justify-center">
                  <Image
                    alt="Card background"
                    className="w-2/3"
                    width={200}
                    height={200}
                    src={logoMenuFollow.src}
                  />
                </div>
                <div className="flex justify-center">
                  <div className="font-NotoSansThai w-2/3 text-center 2xl:mt-6 mt-3 lg:text-base text-xs">
                    <div className="font-bold ">{followStatus.title}</div>
                  </div>
                </div>
              </Link>
            </div> */}
          </>
        </div>
      </div>
    </div>
  );
};

export default Submenu;
