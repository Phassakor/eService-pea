"use client";

import React from "react";
import {useRouter} from "next/navigation";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy(props: any) {
    const router = useRouter();

    const onClickBack = () => {
        router.back();
    }

    return (
        <div className="bg-[#FAFBFC]">
            <Header/>

            <div className="2xl:px-60 lg:px-60 px-0 lg:mt-[42px] mt-[28px] mb-[70px]">
                <div className="relative 2xl:mx-28 lg:p-2 p-0 2xl:mt-8 mt-2">
                    <div
                        className="z-0 md:rounded-2xl bg-white drop-shadow-md lg:pt-[68px] pt-[30px] lg:px-[44px] px-[13px] pb-[50px]">
                        <div className="flex flex-col font-NotoSansThai">
                            <div className="lg:text-[29px] text-[28px] text-[#8E0369] font-bold">Privacy Data Policy
                            </div>
                            <div className="pt-[37px]">โลเล็ม อิปซัม (lorem ipsum) — เป็นข้อความแทนที่ (placeholder
                                text)
                                ใช้เพื่อลดความสนใจต่อข้อความที่นำมาแสดง สำหรับการแสดงลักษณะของ ฟอนต์
                                การพิมพ์และการจัดหน้าข้อความโลเร็ม อิปซัมเป็นข้อความส่วนหนึ่งในภาษาละตินที่แต่งโดย
                                ซิเซโร โดยมีการตัดต่อคำให้ดูเหมือนเป็นข้อความ
                                ที่ไม่มีความหมายและไม่ใช่ภาษาละตินที่ถูกต้องในออกแบบต่างๆ ถ้าข้อความสามารถอ่านได้
                                ผู้ดูจะสนใจข้อความจนไม่สนใจ การจัดหน้าและรูปแบบ ดังนั้นผู้ออกแบบจึงควรใช้ข้อความโลเร็ม
                                อิปซัมเพื่อให้ผู้ดูสนใจที่การออกแบบไม่ใช่ข้อความ
                            </div>
                            <div className="pt-8">โลเล็ม อิปซัม (lorem ipsum) — เป็นข้อความแทนที่ (placeholder text)
                                ใช้เพื่อลดความสนใจต่อข้อความที่นำมาแสดง สำหรับการแสดงลักษณะของ ฟอนต์
                                การพิมพ์และการจัดหน้าข้อความโลเร็ม อิปซัมเป็นข้อความส่วนหนึ่งในภาษาละตินที่แต่งโดย
                                ซิเซโร โดยมีการตัดต่อคำให้ดูเหมือนเป็นข้อความ
                                ที่ไม่มีความหมายและไม่ใช่ภาษาละตินที่ถูกต้องในออกแบบต่างๆ ถ้าข้อความสามารถอ่านได้
                                ผู้ดูจะสนใจข้อความจนไม่สนใจ การจัดหน้าและรูปแบบ ดังนั้นผู้ออกแบบจึงควรใช้ข้อความโลเร็ม
                                อิปซัมเพื่อให้ผู้ดูสนใจที่การออกแบบไม่ใช่ข้อความ
                            </div>
                            <div className="pt-8">โลเล็ม อิปซัม (lorem ipsum) — เป็นข้อความแทนที่ (placeholder text)
                                ใช้เพื่อลดความสนใจต่อข้อความที่นำมาแสดง สำหรับการแสดงลักษณะของ ฟอนต์
                                การพิมพ์และการจัดหน้าข้อความโลเร็ม อิปซัมเป็นข้อความส่วนหนึ่งในภาษาละตินที่แต่งโดย
                                ซิเซโร โดยมีการตัดต่อคำให้ดูเหมือนเป็นข้อความ
                                ที่ไม่มีความหมายและไม่ใช่ภาษาละตินที่ถูกต้องในออกแบบต่างๆ ถ้าข้อความสามารถอ่านได้
                                ผู้ดูจะสนใจข้อความจนไม่สนใจ การจัดหน้าและรูปแบบ ดังนั้นผู้ออกแบบจึงควรใช้ข้อความโลเร็ม
                                อิปซัมเพื่อให้ผู้ดูสนใจที่การออกแบบไม่ใช่ข้อความ
                            </div>
                            <div className="lg:pt-[94px] pt-[84px]">
                                <button
                                    className="bg-[#8E0369] text-white rounded-md 2xl:px-12 lg:px-8 px-4 2xl:py-2 lg:py-2 py-1 font-medium font-NotoSansThai text-[16px] lg:w-[250px] w-full h-[48px]"
                                    onClick={onClickBack}>
                                    กลับ
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}