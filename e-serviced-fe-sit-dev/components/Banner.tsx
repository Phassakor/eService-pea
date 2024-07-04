"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useAppSelector } from "@/redux/store";

const Banner = () => {
  const bannerList = useAppSelector((state) => state.bannerReducer);
  let currentDate = new Date();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="2xl:px-28 lg:px-28 px-0">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
      >
        {bannerList.map((image, index) => {
          let startDate = new Date(image?.start_date);
          if (startDate <= currentDate) {
            return (
              <>
                {!isMobile ? (
                  <SwiperSlide key={index}>
                    <a href={image?.url} target="_blank">
                      <img
                        src={image.image}
                        alt={`Banner ${index}`}
                        width={0}
                        height={0}
                        sizes="90vw"
                        style={{
                          width: "100%",
                          height:"auto",
                          objectFit: "contain"
                        }}
                      />
                    </a>
                  </SwiperSlide>
                ) : (
                  <>
                    <SwiperSlide key={index}>
                      <a href={image?.url} target="_blank">
                        <img
                          src={image.image}
                          alt={`Banner ${index}`}
                          width={0}
                          height={0}
                          sizes="90vw"
                          style={{
                            width: "100%",
                            height:"auto",
                            objectFit: "contain"
                          }}
                        />
                      </a>
                    </SwiperSlide>
                  </>
                )}
              </>
            );
          }
        })}
      </Swiper>
    </div>
  );
};

export default Banner;
