"use client";
import Header from "@/components/Header";
import bannerImg from "@/app/asset/banner-header.png";
import Image from "next/image";
import Footer from "@/components/Footer";
import AnnouncementList from "@/components/announcement/AnnouncementList";
import Banner from "@/components/Banner";
import { useAppSelector } from "@/redux/store";

export default function Home(props: any) {
  const filterMenu = useAppSelector((state) => state.Reducer.search);

  return (
    <div className="bg-[#FAFBFC]">
      <Header />
      {/* <div className="lg:px-28  px-0">
        <Image
          alt="Card background"
          className="2xl:px-28"
          src={bannerImg.src}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div> */}
      <Banner />
      {/* <div className="w-full md:p-[2.625rem_80px_4.375rem_80px] lg:p-[2.625rem_120px_4.375rem_120px]"> */}
      <AnnouncementList searchText={filterMenu} />
      {/* </div> */}
      <Footer />
    </div>
  );
}

// export const metadata = {
//   title: "ประกาศ",
// };
