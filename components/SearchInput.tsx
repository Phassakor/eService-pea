// ตอนนี้ไม่ใช้
"use client";
import { Input } from "@nextui-org/react";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import MenuHome from "./MenuHome";
import { useSelector } from "react-redux";

const SearchInput = () => {
  const [inputText, setInputText] = useState("");
  // const toggle = useSelector((state) => state.announce.value);

  return (
    <>
      <div className="2xl:mx-60 mx-2 2xl:px-64 mt-2 mb-4 font-NotoSansThai">
        <Input
          isClearable
          radius="sm"
          size="sm"
          classNames={{
            label: "text-black/50 dark:text-white/90",
            input: ["text-black/90 dark:text-white/90"],
            inputWrapper: ["bg-white", "border-1", "!cursor-text"],
          }}
          placeholder={"ค้นหาเมนู"}
          value={inputText}
          onValueChange={setInputText}
          startContent={<CiSearch />}
          onClear={() => setInputText("")}
        />
      </div>
      {/* <MenuHome searchText={inputText} /> */}
    </>
  );
};

export default SearchInput;
