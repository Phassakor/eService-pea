"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnnouncementDetail from "@/components/announcement/AnnouncementDetail";
import { useAppSelector } from "@/redux/store";
const page = (props: any) => {
  const filterMenu = useAppSelector((state) => state.Reducer.search);

  return (
    <div className="bg-[#FAFBFC] min-h-screen">
      <Header />
      <AnnouncementDetail searchText={filterMenu} />
      <div className="sticky top-[100vh]">
        <Footer />
      </div>
    </div>
  );
};

export default page;
