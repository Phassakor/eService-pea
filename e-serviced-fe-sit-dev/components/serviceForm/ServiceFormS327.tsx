// "use client";
// import React, { useState, useEffect } from "react";
// import Layout from "../layouts/LayoutForm";
// import { CardHeader, CardBody, useDisclosure } from "@nextui-org/react";
// import {
//   InputForm,
//   TextareaForm,
//   DropdownSelect,
//   ButtonGroup,
//   CheckBox,
//   Divider,
//   InputUpload,
//   Modal,
// } from "../common/index";
// import PersonalInfoForm from "./components/PersonalInfoForm";
// import { IForm } from "@/Interfaces/formInterface";
// import { ICheckbox, IDropdown } from "@/Interfaces/interface";
// import { imageModalData } from "@/public/Data/dataForm";
// import {
//   serviceRequired,
//   electricalWireData,
//   dataPackage,
//   electricPlaceData,
//   dataTime,
// } from "@/public/Data/dataForm";

// import { useFileUpload, useAddressData } from "@/hooks/formHooks";

// export default function ServiceFormS327() {
//  const { file, selectFile, deleteFile, setFileDrag, uploadFile} = useFileUpload();
//   const [dataChecked, setDataChecked] = useState<ICheckbox[]>([]);

//   const [imageModal, setImageModal] = useState<string>("");
//   const { isOpen, onOpen, onOpenChange } = useDisclosure();
//   const serviceRequiredList: IDropdown[] = [
//     { label: "เลือกความต้องการในการขอรับบริการ", value: "" },
//     ...serviceRequired,
//   ];
//   const elePlace: IDropdown[] = [
//     { label: "เลือกรูปแบบสถานที่ใช้ไฟฟ้า", value: "" },
//     ...electricPlaceData,
//   ];
//   const electricalWireList: IDropdown[] = [
//     { label: "เลือกรูปแบบสายไฟฟ้า", value: "" },
//     ...electricalWireData,
//   ];
//   const dataPackageList: IDropdown[] = [
//     { label: "เลือก Package", value: "" },
//     ...dataPackage,
//   ];
//   const { province, districtList, subDistrictList, onChangAddress } =
//     useAddressData();
//   const [formData, setFormData] = useState<IForm>({
//     name: "",
//     surName: "",
//     phoneNumber: "",
//     email: "",
//     location: "",
//     address: "",
//     province: "",
//     district: "",
//     subdistrict: "",
//     post: "",
//     convenientTime: [],
//     detail: "",
//     services: "",
//     meterCodeNo: "",
//     electricPlacetype: "",
//     electricalWireType: "",
//     numberOfElectricVehicle: "",
//     serviceRequirement: "",
//     imageElectricPlace: null,
//     package: "",
//   });
//   useEffect(() => {
//     onSetData("imageElectricPlace", file);
//   }, [file]);
//   const onSetData = (name?: any, value?: any) => {
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//   const onChangData = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     if (name === "address_province" || name === "address_city") {
//       onChangAddress(name, value);
//       setFormData((pre) => ({
//         ...pre,
//         province: name === "address_province" ? value : pre.province,
//         district: name === "address_province" ? "" : value,
//         subdistrict: "",
//       }));
//     } else {
//       onSetData(name, value);
//     }
//   };

//   // Handle checked function
//   const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value, checked } = event.target;
//     let chk: ICheckbox[] = [];
//     const updatedList: ICheckbox[] = [...dataChecked];
//     if (checked) {
//       updatedList.push({
//         value: value,
//       });
//     } else {
//       chk = updatedList.filter((x) => x.value !== value);
//     }
//     const newArr = checked ? updatedList : chk;
//     setDataChecked(newArr);
//     onSetData(name, newArr);
//   };

//   return (
//     <Layout>
//       <CardHeader className="padding-card-header">
//         <div className="text-header-card">
//           ออกแบบและติดตั้งสถานีอัดประจุไฟฟ้า EV Charging Station
//         </div>
//       </CardHeader>
//       <PersonalInfoForm
//         formData={formData}
//         onChange={onChangData}
//         province={province}
//         districtList={districtList}
//         subDistrictList={subDistrictList}
//       />
//       <CardBody className="padding-card-body">
//         <div className="gap-[1.75rem_1.875rem]">
//           <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mt-[20px] mb-[30px]">
//             <DropdownSelect
//               label="ความต้องการในการขอรับบริการ"
//               onChange={onChangData}
//               dataList={serviceRequiredList}
//               name="serviceRequirement"
//               value={formData.serviceRequirement}
//             />
//             <InputForm
//               label="รหัสเครื่องวัด * (10 หลัก)"
//               placeholder="รหัสเครื่องวัด * (10 หลัก)"
//               name="meterCodeNo"
//               onChange={onChangData}
//               value={formData.meterCodeNo}
//             />
//             <div className="flex flex-col text-right">
//               <DropdownSelect
//                 label={"รูปแบบสถานที่ใช้ไฟฟ้า"}
//                 onChange={onChangData}
//                 dataList={elePlace}
//                 name="electricPlacetype"
//                 value={formData.electricPlacetype}
//               />
//               <span
//                 className="underline underline-offset-2 text-[var(--clr-indigo)] font-bold cursor-pointer"
//                 onClick={() => {
//                   setImageModal("M");
//                   onOpen();
//                 }}
//               >
//                 วิธีดูหมายเลขเครื่องวัด
//               </span>
//             </div>
//           </div>
//           <div className="text-sub-title-card mb-5">รูปแบบสายไฟฟ้า</div>
//           <div className="grid md:grid-cols-2 sm:grid-cols gap-[1.75rem_1.875rem] mt-[20px] mb-[30px]">
//             <DropdownSelect
//               label="เลือกรูปแบบสายไฟฟ้า"
//               onChange={onChangData}
//               isRequired={true}
//               dataList={electricalWireList}
//               name="electricalWireType"
//               value={formData.electricalWireType}
//             />
//             <InputForm
//               label="จำนวนรถยนต์ EV ที่มี"
//               placeholder="จำนวนรถยนต์ EV ที่มี"
//               name="numberOfElectricVehicle"
//               isRequired={true}
//               onChange={onChangData}
//               value={formData.numberOfElectricVehicle}
//             />

//             <DropdownSelect
//               label={"เลือก Package ที่ต้องการรับบริการ"}
//               onChange={onChangData}
//               name="package"
//               dataList={dataPackageList}
//               value={formData.package}
//               isRequired={true}
//             />
//             <DropdownSelect
//               label={"เลือกบริการที่ต้องการรับ"}
//               onChange={onChangData}
//               name="services"
//               dataList={serviceRequiredList}
//               value={formData.services}
//               isRequired={true}
//             />
//           </div>
//           <div className="text-sub-title-card">แนบรูปภาพสถานที่ใช้ไฟฟ้า</div>
//           <div className="w-full">
//             <h2 className="text-lg">
//               สามารถแนบไฟล์ได้เฉพาะไฟล์สกุล .jpg .png และ .pdf
//               กรณีต้องการอัพโหลดหลายภาพ กรุณาแนบเป็นไฟล์สกุล .zip
//             </h2>
//             <div className="space-y-1 list-none">
//               <div className="flex"> - หน้าบ้านตรง</div>
//               <div className="flex">
//                 - แนวสายไฟฟ้าเดิมจากเสาไฟฟ้าถึงตัวบ้าน (ดูภาพตัวอย่าง{" "}
//                 <div
//                   className="underline underline-offset-2 text-[var(--clr-indigo)] font-bold cursor-pointer pl-2"
//                   onClick={() => {
//                     setImageModal("EW");
//                     onOpen();
//                   }}
//                 >
//                   {" "}
//                   สายไฟฟ้า
//                 </div>
//                 )
//               </div>
//               <div className="flex">- บริเวณที่จะติดตั้งเครื่องชาร์จ</div>
//               <div className="flex">
//                 - รูป Main Breaker (ดูภาพตัวอย่าง
//                 <div
//                   className="underline underline-offset-2 text-[var(--clr-indigo)] font-bold cursor-pointer pl-2"
//                   onClick={() => {
//                     setImageModal("B");
//                     onOpen();
//                   }}
//                 >
//                   {" "}
//                   Main Breaker
//                 </div>
//                 )
//               </div>
//             </div>
//           </div>
//           <InputUpload
//             onChange={selectFile}
//             fileName={formData.imageElectricPlace}
//             onDelete={deleteFile}
//             setFile={(e) => setFileDrag(e)}
//           />
//         </div>
//       </CardBody>
//       <Divider />
//       <CardBody className="padding-card-body">
//         <div className="gap-[1.75rem_1.875rem]">
//           <div className="text-title-card mb-[11px]">
//             ช่วงเวลาที่สะดวกให้ติดต่อกลับ
//           </div>
//           <div className="text-label">*สามารถเลือกได้มากกว่าหนึ่งตัวเลือก</div>
//           <div className="box-card-time">
//             {dataTime.map((item, index) => (
//               <CheckBox
//                 key={index}
//                 type="checkbox"
//                 label={item.label}
//                 onChange={handleCheck}
//                 name="convenientTime"
//                 value={item.value}
//                 isChecked={dataChecked.some((x) => x.value === item.value)}
//               />
//             ))}
//           </div>

//           <TextareaForm
//             label="รายละเอียดเพิ่มเติม"
//             placeholder="รายละเอียดเพิ่มเติม"
//             onChange={onChangData}
//             name="detail"
//             value={formData.detail}
//             height="min-h-[151px]"
//           />
//         </div>
//         <Modal
//           isOpen={isOpen}
//           onOpenChange={() => {
//             onOpenChange();
//             setImageModal("");
//           }}
//           title={imageModalData.find((x) => x.modalName === imageModal)?.title}
//           pathImmage={
//             imageModalData.find((x) => x.modalName === imageModal)?.path
//           }
//         />
//         <ButtonGroup pathRedirect="service/ออกแบบและติดตั้งสถานีอัดประจุไฟฟ้า EV Charging Station" />
//       </CardBody>
//     </Layout>
//   );
// }
import React from "react";

type Props = {};

export default function ServiceFormS327({}: Props) {
  return <div>ServiceFormS327</div>;
}
