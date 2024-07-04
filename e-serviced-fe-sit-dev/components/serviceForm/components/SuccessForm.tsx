"use client";

import React from "react";
import { CardBody } from "@nextui-org/card";
import Link from "next/link";
import Image from "next/image";
import data from "@/public/status/status.json";
import { Button } from "@nextui-org/button";
import check from "@/app/asset/images/svg/check-icon.svg";
import Layout from "../../layouts/LayoutForm";


const SuccessForm = () => {
  return (
    <Layout>
      <div className="relative">
        <CardBody className="h-[331px] py-12">
          <div className="w-full flex justify-center">
            <Image src={check} width={0} height={0} alt={"paotang icon"} />
          </div>

          <div className="font-NotoSansThai text-[#8E0369] text-center lg:text-2xl text-xl font-bold lg:mt-4 mt-6 lg:mb-8 mb-4">
            บันทึกสำเร็จ
          </div>
          <div className="text-label text-center">
            ระบบได้ดำเนินการบันทึกข้อมูลเรียบร้อย
          </div>
          <div className="font-NotoSansThai text-center 2xl:mt-8 mt-4">
            <Link href={"/"}>
              <Button className="bg-[#8E0369] text-white py-4 2xl:px-8 rounded">
                กลับสู่หน้าหลัก
              </Button>
            </Link>
          </div>
        </CardBody>
      </div>
    </Layout>
  );
};

export default SuccessForm;
