import Reactม, { useState, useEffect } from "react";
import SearchMenu from "./SearchMenu";
import Submenu from "./Submenu";
import submenu from "@/public/submenu.json";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector } from "@/redux/store";
const MenuSearchList = (props: any) => {
  const searchInputText = props.searchText;
  const [search, setSearch] = useState<any[]>([]);
  const followStatus = [
    {
      name: "ติดตามสถานะ",
      icon: "/asset/submenu/8/menu-4.png",
      url: "/status",
    },
  ];
  const dataMenuAll = useAppSelector((state) => state.menuServiceReducer);
  const serviceAll = dataMenuAll.concat(followStatus);
  const data = serviceAll; //props.data;
  function searchMenu(text: any) {
    let searchItem = data.filter(
      (item) => item.name?.toLowerCase().includes(text.trim().toLowerCase())
      // const checkText = item.name;
      // const output = checkText || ""
      //   .trim()
      //   .toLowerCase()
      //   .includes(text.trim().toLowerCase());
      // return output;
    );
    console.log(searchInputText, searchItem);
    setSearch(searchItem);
    return searchItem;
  }
  useEffect(() => {
    searchMenu(searchInputText);
  }, [searchInputText]);
  const allMenu: any = [];

  // if (searchInputText !== "") {
  //   const allSubmenu = submenu.map((data, i) => {
  //     return data.map((data) => allMenu.push({ data }));
  //   });
  // }

  // function searchMenu(text: any) {
  //   let searchItem = allMenu.filter((data) => {
  //     const checkText = data.data.title;
  //     const output = checkText
  //       .trim()
  //       .toLowerCase()
  //       .includes(text.trim().toLowerCase());
  //     return output;
  //   });
  //   return searchItem;
  // }

  // let checkDup: any[] = [];

  // let filterMenu = searchMenu(searchInputText);

  // filterMenu.map((data, i) => {
  //   // checkDup.push(data);
  //   // console.log(checkDup[0]?.data?.title);

  //   if (!checkDup[0]?.data?.title?.includes(data.data.title)) {
  //     checkDup.push(data);
  //   }
  // });

  return (
    <div>
      <div className="2xl:px-96 2xl:mt-6 mt-2 mb-6">
        <div className="shadow-lg 2xl:mx-28  ">
          {search.length > 0 ? (
            <div className="font-NotoSansThai font-bold mt-6 ml-4 mb-2">
              ผลการค้นหา
            </div>
          ) : (
            ""
          )}
          {search.map((data: any, index: any) => {
            // console.log(data);
            let url =
              data.content_type === "richtext"
                ? "/service/" + data.id
                : data.url;
            if (!data.url) {
              url = "/";
            }

            return (
              <div
                className="bg-white hover:bg-[#F6EBF3] cursor-pointer 2xl:py-16 py-4 border-r  border-b border-slate-200"
                key={index}
              >
                <Link
                  className="flex"
                  href={url}
                  target={data.content_type !== "richtext" && data.open_mode === "newtab" ? "_blank" : ""}

                >
                  <div className="flex">
                    <Image
                      alt="icon"
                      //   className="w-2/3"
                      className="self-center"
                      width={50}
                      height={50}
                      //style={{ width: "auto" }}
                      src={`${data.icon.replace("string", "")}`}
                    />
                  </div>
                  <div className=" ">
                    <div className="font-NotoSansThai text-left 2xl:mt-3 mt-1 font-bold 2xl:text-base text-xs">
                      {data.name}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MenuSearchList;
