"use client";
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Link } from "@nextui-org/react";
import Image from "next/image";
import serviceImg from "@/public/asset/service-img.png";
import { useAppSelector } from "@/redux/store";
import { formatDateTimeThaiFull } from "@/utils/utils";
import { getMenuServiceID } from "@/api/api";
import { useRouter } from "next/navigation";
import SearchMenu from "../SearchMenu";
import submenu from "@/public/submenu.json";

const ServiceDetail = (props: any) => {
  const dataMenuAll = useAppSelector((state) => state.menuServiceReducer);
  const [dataDetail, setDataDetail] = useState<any>();
  const [dataService, setDataService] = useState<any>([]);

  const searchInputText = props.searchText;

  const allMenu: any = [];
  const allSubmenu = submenu.map((data, i) => {
    return data.map((data) => allMenu.push({ data }));
  });

  console.log(props);

  const getService = async (id: any) => {
    const dataService = await getMenuServiceID(id);

    if (dataService?.data) {
      setDataService(dataService);
    }
  };

  useEffect(() => {
    const data = dataMenuAll.find((x) => x.id === props.id) || "";
    setDataDetail(data);
  }, [props.id]);

  useEffect(() => {
    getService(props?.id);
  }, []);

  let contentDetail;
  if (dataService?.data) {
    contentDetail = dataService?.data?.content_detail;
  }

  // console.log(contentDetail);

  const title = props.id;
  const titleThai = decodeURIComponent(title);
  let getServiceUrl = "#";
  if (titleThai === "ขอซ่อมแซมอุปกรณ์ไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S301";
  } else if (titleThai === "บริการตรวจสอบและบำรุงรักษาสวิตซ์เกียร์") {
    getServiceUrl = "/y-form2/serviceForm/S302";
  } else if (titleThai === "บริการตรวจสอบและบำรุงรักษาเคเบิล") {
    getServiceUrl = "/y-form2/serviceForm/S303";
  } else if (titleThai === "บริการตรวจสอบและบำรุงรักษารีเลย์") {
    getServiceUrl = "/y-form2/serviceForm/S304";
  } else if (titleThai === "ขอบำรุงรักษาหม้อแปลงไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S305";
  } else if (titleThai === "ขอแก้ไขบำรุงรักษาระบบจำหน่าย") {
    getServiceUrl = "/y-form2/serviceForm/S306";
  } else if (titleThai === "ขอแก้ไข หรือ บำรุงรักษาระบบจำหน่ายโดย Hotline") {
    getServiceUrl = "/y-form2/serviceForm/S307";
  } else if (titleThai === "ขอตรวจสอบระบบไฟฟ้าและออกใบรับรอง") {
    getServiceUrl = "/y-form2/serviceForm/S308";
  } else if (titleThai === "ขอตรวจหาจุดร้อน หรือ จุดสัมผัสทางไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S309";
  } else if (titleThai === "ขอที่ปรึกษาด้านวิศวกรรมและตรวจรับรองระบบไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S310";
  } else if (titleThai === "บริการที่ปรึกษาด้านวิศวกรรมและก่อสร้าง") {
    getServiceUrl = "/y-form2/serviceForm/S311";
  } else if (titleThai === "ขอทดสอบอุปกรณ์ไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S312";
  } else if (titleThai === "ขอทดสอบหม้อแปลงไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S313";
  } else if (titleThai === "ขอเช่าฉนวนครอบสายไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S314";
  } else if (titleThai === "ขอเช่าหม้อแปลงไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S315";
  } else if (titleThai === "ขอเช่าเครื่องกำเนิดไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S316";
  } else if (titleThai === "ขอติดตั้งมิเตอร์เปรียบเทียบ TOU") {
    getServiceUrl = "/y-form2/serviceForm/S317";
  } else if (titleThai === "ขอซื้อมิเตอร์หรืออุปกรณ์ไฟฟ้า") {
    getServiceUrl = "/y-form2/serviceForm/S318";
  } else if (titleThai === "บริการข้อมูล Load Profile") {
    getServiceUrl = "/y-form2/serviceForm/S319";
  } else if (titleThai === "ขอติดตั้งมิเตอร์เปรียบเทียบ กรณีผิดปกติ") {
    getServiceUrl = "/y-form2/serviceForm/S320";
  } else if (titleThai === "ขอแก้กระแสไฟฟ้าขัดข้อง") {
    getServiceUrl = "/y-form2/serviceForm/S321";
  } else if (titleThai === "ขอตรวจสอบและบำรุงรักษาระบบไฟฟ้าแบบครบวงจร") {
    getServiceUrl = "/y-form2/serviceForm/S322";
  } else if (titleThai === "บริการทดสอบผลิตภัณฑ์คอนกรีต") {
    getServiceUrl = "/y-form2/serviceForm/S323";
  } else if (
    titleThai === "ออกแบบและติดตั้งสถานีอัดประจุไฟฟ้า EV Charging Station"
  ) {
    getServiceUrl = "/y-form2/serviceForm/S327";
  } else if (
    titleThai === "บริการออกแบบและติดตั้งระบบผลิตไฟฟ้าจากพลังงานแสงอาทิตย์"
  ) {
    getServiceUrl = "/y-form2/serviceForm/S328";
  } else if (titleThai === "ขอซื้อขายใบรับรองการผลิตพลังงานหมุนเวียน") {
    getServiceUrl = "/y-form2/serviceForm/S329";
  } else if (titleThai === "ขอบริการอื่นๆ") {
    getServiceUrl = "/y-form2/serviceForm/S399";
  }

  const router = useRouter();

  const handleBack = () => {
    // router.back();
    // router.push("/");
  };

  useEffect(() => {}, [props]);

  return (
    <>
      {searchInputText === "" ? (
        <div className="font-NotoSansThai 2xl:mx-64 2xl:my-12 my-8 2xl:mt-6 lg:px-60 mx-2">
          <div className="relative">
            <Card className="2xl:mx-28 2xl:rounded-t-lg rounded-t-none 2xl:rounded-b-lg rounded-b-none  ">
              <CardBody className="lg:p-8 p-4">
                {dataDetail ? (
                  <>
                    <div>
                      <div className="mx-0">
                        {/* <div className="font-bold lg:text-2xl text-large text-[#8E0369] mb-2"> */}
                        <div
                          style={{ fontSize: "28px" }}
                          className="font-bold text-[#8E0369] mb-2"
                        >
                          รายละเอียดบริการ
                        </div>
                        <div className="font-bold lg:text-[22px] text-lg text-black mb-1 ">
                          {dataDetail?.name}
                        </div>

                        <div className="text-[#96989B] lg:text-base text-sm mb-4">
                          {formatDateTimeThaiFull(dataDetail?.updated_date)}
                        </div>
                        <div className="w-full h-1 bg-[#FAFBFC]"></div>
                        <div className="mt-4 text-justify lg:text-base text-sm">
                          <div
                            className="mb-2"
                            dangerouslySetInnerHTML={{ __html: contentDetail }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex font-NotoSansThai my-4 mt-6">
                      <Link
                        href={dataDetail.url}
                        target={
                          dataDetail.open_mode === "newtab" ? "_blank" : ""
                        }
                        className="lg:w-1/5 w-full lg:mr-4 lg:mb-0 mb-4"
                      >
                        <Button className="bg-[#8E0369] text-white w-full rounded">
                          ขอรับบริการ
                        </Button>
                      </Link>
                      <div
                        // onClick={() => router.push("/")}
                        className="lg:w-1/5 w-full"
                      >
                        <Button
                          className="bg-[#C7C7C7] text-white w-full rounded"
                          onClick={() => router.push("/")}
                        >
                          ย้อนกลับ
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="font-NotoSansThai my-4 mt-6">
                    {/* <Link href={"/"} className="lg:w-1/5 w-full"> */}
                    <div className="lg:w-1/5 w-full">
                      <Button
                        className="bg-[#C7C7C7] text-white w-full rounded"
                        // onClick={handleBack}
                        onClick={() => router.back()}
                      >
                        กลับ
                      </Button>
                    </div>

                    {/* </Link> */}
                  </div>
                )}
              </CardBody>
            </Card>
          </div>
        </div>
      ) : (
        <SearchMenu data={allMenu} searchText={searchInputText} />
      )}
    </>
  );
};

export default ServiceDetail;
