"use client";
import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import {
  getFooter,
  getBanner,
  getCarousels,
  getAllCategory,
  getMenuService,
  getFile,
} from "../api/api";
import { setDataFooter } from "@/redux/slices/footerSlice";
import { setDataBanner } from "@/redux/slices/bannerSlice";
import { setDataCarousels } from "@/redux/slices/carouselsSlice";
import { setDataCategory } from "@/redux/slices/categorySlice";
import { setMenuService } from "@/redux/slices/menuServiceSlice";
import Loader from "@/components/Loader";
import Banner from "@/components/Banner";

const CardAnnounce = dynamic(() => import("@/components/CardAnnounce"));
const Footer = dynamic(() => import("@/components/Footer"));
const MenuHome = dynamic(() => import("@/components/MenuHome"));
const MenuSearchList = dynamic(() => import("@/components/MenuSearchList"));

export default function Home(props: any) {
  const [isLoad, setIsLoad] = useState(false);
  const filterMenu = useAppSelector((state) => state.Reducer.search);
  const isMobileSearch = useAppSelector(
    (state) => state.Reducer.isMobileSearch
  );
  const dispatch = useAppDispatch();
  const GetImage = useCallback(
    async (url: string | undefined): Promise<string> => {
      if (url && url !== "") {
        try {
          const file = await getFile(url);
          if (file) {
            const namefile = url.replace("/CMS/", "");
            const files = new File([file], namefile, { type: file.type });
            return URL.createObjectURL(files);
          }
        } catch (error) {
          console.error(`Error fetching image ${url}:`, error);
        }
      }
      return "";
    },
    []
  );
  const transformImages = useCallback(
    async (data: any[], imageProp: string) => {
      const transformedData = await Promise.all(
        data.map(async (item) => {
          const transformedUrl = await GetImage(item[imageProp]);
          return {
            ...item,
            [imageProp]: transformedUrl || item.icon,
          };
        })
      );
      return transformedData;
      // setData(transformedData);
    },
    [GetImage]
  );

  const fetchData = useCallback(async () => {
    setIsLoad(true);
    try {
      const [
        footerData,
        bannerData,
        carouselsData,
        allCategoryData,
        menuServiceData,
      ] = await Promise.all([
        getFooter(),
        getBanner(),
        getCarousels(),
        getAllCategory(),
        getMenuService(),
      ]);
      const transformedBannerData = await transformImages(
        bannerData.data,
        "image"
      );
      const transformedCategoryData = await transformImages(
        allCategoryData.data,
        "icon"
      );
      const transformedCarouselsData = await transformImages(
        carouselsData.data,
        "image"
      );
      const transformedMenuServiceData = await transformImages(
        menuServiceData.data,
        "icon"
      );
      dispatch(setDataFooter(footerData.data));
      dispatch(setMenuService(transformedMenuServiceData));
      dispatch(setDataCarousels(transformedCarouselsData));
      dispatch(setDataCategory(transformedCategoryData));
      dispatch(setDataBanner(transformedBannerData));
      console.log("transformedBannerData", transformedBannerData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoad(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div className="bg-[#FAFBFC]">
      {isLoad && <Loader />}
      <Header />
      {!isMobileSearch ? (
        <>
          <Banner />
          <CardAnnounce />
          <MenuHome searchText={filterMenu} pageProps={props} />
          <Footer />
        </>
      ) : (
        <MenuSearchList searchText={filterMenu} />
      )}
    </div>
  );
}
