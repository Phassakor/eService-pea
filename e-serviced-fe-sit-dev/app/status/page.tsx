"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import StatusMenu from "@/components/status/StatusMenu";
import { useAppSelector } from "@/redux/store";

const page = (props: any) => {
  const filterMenu = useAppSelector((state) => state.Reducer.search);

  return (
    <div className="bg-[#FAFBFC] h-screen flex flex-col">
      <Header />
      <div className="flex-grow ">
        <StatusMenu searchText={filterMenu} />
      </div>
      <div className=" w-full ">
        <Footer />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

// export const metadata = {
//   title: "ติดตามสถานะ",
// };

export default page;
