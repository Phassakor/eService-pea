"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import StatusAuth from "@/components/status/StatusAuth";
import { Metadata } from "next";
import { getFooter } from "@/api/api";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { setDataFooter } from "@/redux/slices/footerSlice";

const page = (props: any) => {
  const filterMenu = useAppSelector((state) => state.Reducer.search);

  // const dispatch = useAppDispatch();
  // const [isLoad, setIsLoad] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoad(true);
  //     try {
  //       const [footerData] = await Promise.all([getFooter()]);

  //       dispatch(setDataFooter(footerData.data));
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     } finally {
  //       setIsLoad(false);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <Header />
      <StatusAuth searchText={filterMenu} />

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
