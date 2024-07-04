"use client";
import Link from "next/link";
import React from "react";
import { GrAnnounce } from "react-icons/gr";
//import data from "@/public/announce/annouce.json";
import { useAppSelector } from "@/redux/store";
import { formatDateThaiFull } from "@/utils/utils";
const CardAnnounce = () => {
  const data = useAppSelector((state) => state.carouselsReducer);
  if (!data || data.length === 0) {
    return (
      <div className="2xl:px-60 px-0">
        <div className="relative 2xl:mx-60 p-2 2xl:mt-8 mt-2">
          <div className="z-0 md:rounded bg-white drop-shadow-md p-5">
            <div className="flex justify-center">
              <div className="font-NotoSansThai font-bold lg:text-xl text-xs">
                ไม่มีข้อมูลประกาศ
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  let indexShow = 0;

  if (indexShow === 0) {
    for (let i = 0; i < data?.length; i++) {
      let currentDate = new Date();
      let startDate = new Date(data[i]?.start_date);
      if (startDate <= currentDate) {
        break;
      } else {
        indexShow++;
      }
    }
  }

  // console.log(indexShow);

  return (
    <div className="2xl:px-60 lg:px-60 px-0">
      <div className="relative 2xl:mx-28 p-2 2xl:mt-8 mt-2">
        <div className="z-40 absolute top-0 left-0">
          <GrAnnounce className="bg-[#8E0369] text-white 2xl:w-8 lg:w-8 w-[30px] 2xl:h-8 lg:h-8 h-[30px] 2xl:rounded-xl lg:rounded-xl rounded-md 2xl:p-1 p-1" />
        </div>
        <div className="z-0 md:rounded-2xl bg-white drop-shadow-md p-5">
          <div className="flex justify-between">
            <div className="font-NotoSansThai font-bold 2xl:ml-4 ml-2 lg:text-[22px] text-xs">
              {data[indexShow]?.name}
            </div>
            <div className="lg:text-[14px] text-xxs text-[#A0A0A0] font-NotoSansThai">
              {formatDateThaiFull(data[indexShow]?.start_date)}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="font-NotoSansThai 2xl:ml-4 ml-2 lg:text-base text-xxs  2xl:w-3/4 w-3/4 pt-2">
              เนื้อหาประกาศ {data[indexShow]?.description?.substring(0, 100)}
            </div>
            <div>
              {data[indexShow]?.content_type == "richtext" ? (
                <>
                  <Link href={`/announce/${data[indexShow].id}`}>
                    <button className="bg-[#8E0369] text-white rounded-md 2xl:px-12 lg:px-8 px-4 2xl:py-2 lg:py-2 py-1 font-medium font-NotoSansThai lg:text-[14px] text-xxs">
                      {/* {data[indexShow]?.button_text} */}
                      ดูเพิ่มเติม
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href={`${data[indexShow]?.url}`} target="_blank">
                    <button className="bg-[#8E0369] text-white rounded-md 2xl:px-12 lg:px-8 px-4 2xl:py-2 lg:py-2 py-1 font-medium font-NotoSansThai lg:text-[14px] text-xxs">
                      {/* {data[indexShow]?.button_text} */}
                      ดูเพิ่มเติม
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <Link href={"/announce"}>
              <button className="bg-[#8E0369] text-white rounded-md 2xl:px-12 lg:px-8 px-4 2xl:py-2 lg:py-2 py-1 font-medium font-NotoSansThai lg:text-[14px] text-xxs">
                ดูทั้งหมด
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardAnnounce;
