// "use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { Metadata } from "next";
import StatusTableDetail from "@/components/status/StatusTableDetail";
import { useAppSelector } from "@/redux/store";

const page = (props: any) => {
  const filterMenu = useAppSelector((state) => state.Reducer.search);

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <Header />
      <StatusTableDetail searchText={filterMenu} />
      <div className="sticky top-[100vh]">
        <Footer />
      </div>
    </div>
  );
};

// export const metadata: Metadata = {
//   title: "ติดตามสถานะ",
// };

export default page;
