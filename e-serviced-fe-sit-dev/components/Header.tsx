"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import eserviceLogoImg from "@/app/asset/e-service logo.png";
import Link from "next/link";
import SearchInput from "./SearchInput";
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import {
  updateIsMobileSearch,
  updateSearchInput,
  updateSelectedMenu,
  updateSelectedSubmenu,
} from "@/redux/Reducer";
import { IoIosArrowBack } from "react-icons/io";
import { useAppSelector } from "@/redux/store";
import { getFile } from "@/api/api";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [Logo, setLogo] = useState("");
  const [isMobileSearch, setIsMobileSearch] = useState(false);
  const dataCarousels = useAppSelector((state) => state.footerReducer);

  let getFullURL = window.location.href;
  console.log(getFullURL.includes("serviceForm"));

  useEffect(() => {
    if (getFullURL.includes("serviceForm") === false) {
      dispatch(updateSearchInput(inputText));
    }
    // console.log(inputText);
  }, [inputText]);

  useEffect(() => {
    if (getFullURL.includes("serviceForm") === false) {
      dispatch(updateIsMobileSearch(isMobileSearch));
    }
  }, [isMobileSearch]);

  const GetImage = async () => {
    if (dataCarousels.logo && dataCarousels.logo != "") {
      const file = await getFile(dataCarousels.logo);
      if (file) {
        const namefile = dataCarousels.logo.replace("/CMS/", "");
        const files = new File([file], namefile, { type: file.type });
        setLogo(URL.createObjectURL(files));
      }
    }
  };

  useEffect(() => {
    if (dataCarousels && dataCarousels.logo) {
      GetImage();
    }
  }, [dataCarousels]);
  return (
    <div className="bg-white p-4 border-b border-[#E9EAEC] md:p-[1rem_80px] lg:p-[1rem_120px] max-md:p-[22px_24px]">
      {isMobileSearch === false ? (
        <div className="flex justify-between px-0">
          <Link href={"/"}>
            <Image
              alt="Card background"
              width={0}
              height={0}
              style={{ width: "250px", height: "50px" }}
              className="lg:w-full w-1/2"
              // src={eserviceLogoImg.src}
              src={Logo}
            />
          </Link>

          {!getFullURL.includes("serviceForm") ? (
            <>
              <Input
                className="w-1/4 font-NotoSansThai lg:block hidden"
                isClearable
                radius="sm"
                size="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: ["text-black/90 dark:text-white/90"],
                  inputWrapper: [
                    "bg-white",
                    "border-1",
                    "!cursor-text",
                    "border-[#68326B]",
                  ],
                }}
                placeholder={"ค้นหาบริการ"}
                value={inputText}
                onValueChange={setInputText}
                startContent={<CiSearch />}
                onClear={() => setInputText("")}
              />
              <div className="lg:hidden">
                <div className="mt-1">
                  <CiSearch
                    className="text-[#68326B]"
                    style={{ fontSize: "18px" }}
                    onClick={() => {
                      setIsMobileSearch(true);
                      // dispatch(updateIsMobileSearch(true));
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        <div className="">
          <div className="flex">
            <IoIosArrowBack
              className="mt-2 bg-[#8E0369] rounded text-white text-xl p-[3px]"
              onClick={() => {
                setIsMobileSearch(false);
                dispatch(updateIsMobileSearch(false));
              }}
            />
            <div className="ml-4 w-full">
              <Input
                className=" font-NotoSansThai"
                isClearable
                radius="sm"
                size="lg"
                classNames={{
                  label: "text-black/50 dark:text-white/90",
                  input: ["text-black/90 dark:text-white/90"],
                  inputWrapper: [
                    "bg-white",
                    "border-1",
                    "!cursor-text",
                    "border-[#68326B]",
                  ],
                }}
                placeholder={"ค้นหาบริการ"}
                value={inputText}
                onValueChange={setInputText}
                startContent={<CiSearch />}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
