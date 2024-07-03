"use client";
import { useParams } from "next/navigation";
//import data from "@/public/announce/annouce.json";
import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Link } from "@nextui-org/react";
import { useAppSelector } from "@/redux/store";
import { SiteCarousels } from "@/Interfaces/propsInterface";
import { formatDateTimeThaiFull } from "@/utils/utils";
import submenu from "@/public/submenu.json";
import { useRouter } from "next/navigation";
import SearchMenu from "../SearchMenu";

const AnnouncementDetail = (props: any) => {
  const params = useParams();
  const [data, setDataDetail] = useState<SiteCarousels>();
  const dataCarousels = useAppSelector((state) => state.carouselsReducer);
  useEffect(() => {
    let findData: SiteCarousels | undefined = dataCarousels.find(
      (x) => x.id === params.id
    );
    setDataDetail(findData);
  }, []);
  const router = useRouter();
  const handleBack = () => {
    router.back();
  };

  const searchInputText = props.searchText;

  const allMenu: any = [];
  const allSubmenu = submenu.map((data, i) => {
    return data.map((data) => allMenu.push({ data }));
  });

  return (
    <>
      {searchInputText === "" ? (
        <div className="font-NotoSansThai 2xl:mx-64 2xl:my-12 my-8 2xl:mt-6 lg:px-60 mx-2">
          <div className="relative">
            <Card className="2xl:mx-28 2xl:rounded-t-lg rounded-t-none 2xl:rounded-b-lg rounded-b-none  ">
              <CardBody className="lg:p-8 p-4">
                <div>
                  <div className="mx-0">
                    <div className="font-bold lg:text-2xl text-large text-[#8E0369] mb-1 ">
                      {data?.name}
                    </div>
                    <div className="text-[#96989B] lg:text-base text-sm mb-4">
                      {formatDateTimeThaiFull(data?.start_date)}
                    </div>
                    <div className="w-full h-1 bg-[#FAFBFC]"></div>
                    <div className="mt-4 text-justify lg:text-base text-sm">
                      {/* {data?.content_detail} */}
                      {data && data.content_detail && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.content_detail,
                          }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="font-NotoSansThai my-4">
                  {/* <Link href={"/"} className="lg:w-1/5 w-full"> */}
                  <div className="lg:w-1/5 w-full">
                    <Button
                      className="bg-[#C7C7C7] text-white w-full rounded"
                      onClick={handleBack}
                    >
                      ย้อนกลับ
                    </Button>
                  </div>
                </div>
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

export default AnnouncementDetail;
