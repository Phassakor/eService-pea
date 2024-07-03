"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ServiceDetail from "@/components/service/ServiceDetail";
import { useAppSelector } from "@/redux/store";
import { useParams } from "next/navigation";
import React from "react";

const page = (props: any) => {
  // console.log(props);
  const filterMenu = useAppSelector((state) => state.Reducer.search);

  const params = useParams();

  return (
    <div className="min-h-screen">
      <Header />
      <ServiceDetail id={params.id} searchText={filterMenu} />
      <div className="sticky top-[100vh]">
        <Footer />
      </div>
    </div>
  );
};

export default page;
