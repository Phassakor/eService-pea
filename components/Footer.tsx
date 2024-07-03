"use client";
import React, { useCallback, useEffect, useState } from "react";
import FooterImg from "@/app/asset/footer-bg.png";
import FooterImgMB from "@/app/asset/footer-bg-m.png";
import Link from "next/link";
import Image from "next/image";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { BsHeadset } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { useAppSelector } from "@/redux/store";
import { getFile, getFooter } from "@/api/api";
const Footer = () => {
  const data = useAppSelector((state) => state.footerReducer);
  // console.log(data);

  const GetImage = useCallback(
    async (url: string | undefined): Promise<string> => {
      if (url && url !== "") {
        try {
          const file = await getFile(url);
          if (file) {
            const namefile = url.replace("/CMS/", "");
            const files = new File([file], namefile, { type: file.type });
            return URL.createObjectURL(files);
          }
        } catch (error) {
          console.error(`Error fetching image ${url}:`, error);
        }
      }
      return "";
    },
    []
  );

  const transformImages = useCallback(
    async (data: any[], imageProp: string) => {
      const transformedData = await Promise.all(
        data?.map(async (item) => {
          const transformedUrl = await GetImage(item[imageProp]);
          return {
            ...item,
            [imageProp]: transformedUrl || item.icon,
          };
        })
      );
      return transformedData;
      // setData(transformedData);
    },
    [GetImage]
  );

  const [otherSocial, setOtherSocial] = useState<any>([]);

  const fetchOtherSocial = async () => {
    const [footerData] = await Promise.all([getFooter()]);

    const transformedFooterData = await transformImages(
      footerData?.data?.social_media_detail,
      "logo"
    );

    setOtherSocial(transformedFooterData);
  };

  useEffect(() => {
    fetchOtherSocial();
  }, []);

  // console.log(otherS);

  // const [data, setData] = useState(dataFooter);
  return (
    <>
      <div className="flex lg:flex-row flex-col lg:text-base text-xs justify-center lg:w-full mx-0 absolute p-6 2xl:gap-48 lg:gap-12 2xl:mt-8 lg:mt-0 mt-10 font-NotoSansThai text-white">
        <div className="section1">
          <div className="font-semibold 2xl:text-[18px] lg:text-lg">
            {data?.address_name}
          </div>
          <div className="flex gap-x-5 lg:mt-2 my-2">
            {data?.x && (
              <div>
                <Link href={`${data.x}`}>
                  <FaXTwitter className="w-[20px] h-[20px]" />
                </Link>
              </div>
            )}
            {data?.facebook && (
              <div>
                <Link href={`${data.facebook}`}>
                  <FaFacebookF className="w-[20px] h-[20px]" />
                </Link>
              </div>
            )}

            {data?.instagram && (
              <div>
                <Link href={`${data?.instagram}`}>
                  <FaInstagram className="w-[20px] h-[20px]" />
                </Link>
              </div>
            )}
            {data?.social_media_detail &&
              data?.social_media_detail.length > 0 &&
              otherSocial?.map((item: any, i: any) => (
                <a key={i} href={`${item?.url}`} target="_blank" className=" ">
                  <Image
                    width={20}
                    height={20}
                    alt="icon"
                    src={item.logo as string}
                    // radius="none"
                  />
                </a>
              ))}
          </div>
        </div>
        <div className="section2">
          <div className="font-semibold 2xl:text-[18px] lg:text-[16px]">
            ติดต่อเรา
          </div>
          <div className="flex flex-col gap-x-2  gap-y-1 font-light lg:text-[14px] text-sm">
            <div className="flex">
              <BsTelephone className="w-[19px] h-[19px]" />
              <div className="pl-1">{data?.phone}</div>
            </div>
            <div className="flex">
              <BsHeadset className="w-[20px] h-[20px]" />
              <div className="pl-1">{data?.hotline}</div>
            </div>
            <div className="flex">
              <CiLocationOn className="w-[20px] h-[20px]" />
              <div className="pl-1">{data?.address_detail}</div>
            </div>
          </div>
        </div>
        <div className="section3">
          <div className="invisible">No Header</div>
          <div className="flex flex-col lg:ml-0 ml-4  gap-y-1 font-light lg:text-[14px] text-sm">
            <div>Terms and Conditions</div>
            <div>Privacy Data Policy</div>
          </div>
        </div>
      </div>

      <Image
        alt="Card background"
        src={FooterImg.src}
        width={0}
        height={0}
        sizes="100vw"
        layout=""
        className="lg:block hidden"
        style={{ width: "100%", height: "" }}
      />
      <Image
        alt="Card background"
        src={FooterImgMB.src}
        width={0}
        height={0}
        sizes="100vw"
        className="lg:hidden block"
        style={{ width: "100%", height: "auto", maxHeight: "380px" }}
      />
      <div className="bg-[#B28100] text-white text-center py-3 2xl:text-base text-xxs">
        {data?.copyright}
      </div>
    </>
  );
};

export default Footer;
