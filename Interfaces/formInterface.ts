import React from "react";
// export interface IElectricTransformers {
//   id: number;
//   status?: string;
//   brand?: string;
//   phase?: string;
//   type?: string;
//   serial?: string;
//   size?: string;
//   pressure?: string;
// }
export interface IForm {
  id?: number;
  name?: string;
  surName?: string;
  phoneNumber?: string;
  email?: string;
  location?: string;
  address?: string;
  province?: string;
  district?: string;
  subdistrict?: string;
  post?: string;
  serviceType?: string;
  requestType?: string;
  convenientTime?: any[];
  file?: File | null;
  BusinessType?: string;
  electricalEquipmentType?: string; //ประเภทอุปกรณ์ไฟฟ้า
  quantity?: string; //จำนวน
  electricTransformers?: IElectricTransformers[];
  totalTransformerSize?: string; //ขนาดหม้อแปลงที่ติดตั้งรวม
  detail?: string;
  services?: string; //เลืือกบริการที่ต้องการรับ
  meterCodeNo?: string; //รหัสเครื่องวัด 10 หลัก
  electricPlacetype?: string; //รูปแบบสถานที่ใช้ไฟฟ้า
  electricalWireType?: string; //รูปแบบสายไฟฟ้า
  numberOfElectricVehicle?: string; //จำนวนรถยนต์ EV
  packageServiceRequirement?: string; //
  serviceRequirement?: string; //ความต้องการในการขอรับบริการ
  imageElectricPlace?: File | null;
  package?: string; // การบริการ
  voltag?: string; //ระดับแรงดันไฟฟ้า
  selectEquipment?: string; //เลือกอุปกรณ์ไฟฟ้า
  size?: string; //ขนาดที่ต้องการ
  quantityKw?: string; //จำนวน Kw
  quantityGeneratorSet?: string; //จำนวนเครื่อง
  startDate?: string;
  endDate?: string;
  numberOfDays?: string;
  quantityTransformer?: string;
  transformerSize?: string;
  renewableEnergy?: any[]; //แหล่งที่มาพลังงานหมุนเวียน
  renewableEnergyOther?: string; //other
  quantityCableInsulation?: string; //จำนวนฉนวน
  renewableEnergyRequirement?: string;
  year?: string;
}

export interface ICustomRangeInputProps {
  onFocus?: () => void;
  value?: string;
  separator?: string;
}
export interface IDataPersonal {
  morning_flag?: boolean;
  afternoon_flag?: boolean;
  first_name?: string;
  last_name?: string;
  mobile_no?: string;
  email?: string;
  address?: string;
  address_province?: string;
  address_city?: string;
  address_district?: string;
  address_post_code?: string;
  business_type_id?: string;
  detail?: string;
}
export interface IPersonalInfoFormProps {
  formData: IDataPersonal;
  onChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  location?: boolean;
  isInvalid?: boolean;
}

export interface IFormService extends IDataPersonal {
  service_code?: string;
  pea_office?: string;
  channel?: number;
  is_del?: number;
  equipment_type?: string;
  fileUpload?: File | null; // for show in card upload
  files?: string;
  request_service?: string;
  request_type?: string;
  request_service_type?: string;
  equipment_type_id?: string;
  rental_startdate?: string;
  rental_enddate?: string;
  days?: number;
  year?: string;
  kw_size?: number;
  equipment_id?: string;
  amps_size?: number;
  size_install?: string;
  request_time?: string;
  equipment_no?: string;
  place_form?: string;
  wire_form?: string;
  qty?: number;
  qty_ev?: number;
  package_service?: string; //เลือกแพคเกจ
  package_request?: string;
  renewable_type?: string;
  renewable_source_solar?: boolean;
  renewable_source_wind?: boolean;
  renewable_source_hydro?: boolean;
  renewable_source_bio?: boolean;
  renewable_source_all?: boolean;
  renewable_source_other?: boolean;
  renewable_source_other_detail?: string;
  transformer_qty?: number; //ขนาดหม้อแปลงที่ติดตั้งรวม
  transformer_size?:number;
  legal_form?: string;
  nationality?: string;
  transformer_voltage?: string;
  transformers?: ITransformer[];
  ca_no?:string
}

export interface ITransformer {
  transformer_brand?: string;
  transformer_phase?: string;
  transformer_type?: string;
  transformer_serial?: string;
  transformer_size?: string;
  transformer_voltage?: string;
}
export interface IBaseTransformer {
  transformer_brand?: string;
  transformer_phase?: string;
  transformer_type?: string;
  transformer_serial?: string;
  transformer_size?: string;
  transformer_voltage?: string;
}

export interface IElectricTransformers extends IBaseTransformer {
  id: number;
  status: "D"|"N";
}

// Type for saving data without id and status
export type SaveTransformer = Omit<IElectricTransformers, 'id' | 'status'>;
export interface IAddress {
  id: string;
  ics_id: string;
  name: string;
  is_del: boolean;
  provinceId: string;
  districtId: string;
  postcode: string;
}
export interface IAlertMsg{
  type: string,
  open: boolean,
  msg: string,
  onConfirm?:()=>void 
}

export interface IMasterData{
  id: string
  ics_id: string
  services_id: string
  sub_id: any
  item_slug: string
  item_name: string
  item_description: any
  option_title: string
}

export interface IServiceData {
  id?: string
  ics_id?: string
  service_group_id?: string
  name?: string
  detail?: string
  request_code?: string
  request_type_code?: string
  priority?: number
  payment_term?: number
  survey_group?: number
  payment_term_desc?: string
  is_survey?: boolean
  is_active?: boolean
  is_linkout?: boolean
  linkout_endpoints?: any
}




// const data = {
//   service_code: "S327",
//   channel: 0,
//   morning_flag: true,
//   afternoon_flag: true,
//   first_name: "FirstName22",
//   last_name: "LastName22",
//   mobile_no: "0875822475",
//   email: "firstname.l@kanda.digital",
//   address: "440/067 คอนโดไทย",
//   address_province: "30",
//   address_city: "3009",
//   address_district: "300908",
//   address_post_code: "30220",
//   request_type: "XXX",
//   detail: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas venenatis nunc ac justo pharetra laoreet. Fusce ut mi elementum, lobortis arcu quis, viverra ipsum. Maecenas dui arcu.",
//   legal_form: "",
//   nationality: "",
//   equipment_type: "7F3D3C5A-3CCA-4F88-B866-48871BD577CB",
//   business_type_id: "1413F877-0E21-491A-B733-3A4EF8CD8F0F",
//   qty: 0,
//   request_service: "4D48FDDB-058C-4784-8396-4DD3673AE2E9",
//   request_service_type: "996FBDCF-27A6-461B-94B3-5CAD12810CC3",
//   transformers: [
//     {
//       transformer_brand: "B4B7744D-25CD-447A-B103-582D2EA12A0D",
//       transformer_phase: "B50F79DC-3EF2-49DE-A5C2-7079F9A7C55D",
//       transformer_type: "539DA6E2-036B-4C76-9E56-1FA69BF08646",
//       transformer_serial: "TRANSFORMERSERIAL00",
//       transformer_size: "1",
//       transformer_voltage: "100V"
//     }
//   ],
//   transformer_voltage: "22",
//   transformer_size: 0,
//   transformer_qty: 0,
//   equipment_type_id: "D2993E34-01A1-4B84-A014-C99C239A76E8",
//   rental_startdate: "2024-04-22 23:59:59",
//   rental_enddate: "2024-04-30 23:59:59",
//   days: 1,
//   kw_size: 10,
//   equipment_id: "D2993E34-01A1-4B84-A014-C99C239A76E8",
//   amps_size: 0,
//   size_install: "10",
//   request_time: "95D06812-9D1D-4DEA-9A0F-F1E9FF8932F5",
//   equipment_no: "A1",
//   place_form: "A48AC0C0-602C-4571-9387-2B3E0BD5C727",
//   wire_form: "61F04670-3349-419A-B501-36DA9E628347",
//   qty_ev: 0,
//   package_service: "D2C43111-1345-45E0-B365-B5D3A2C90C0D",
//   package_request: "BC48F0E3-6D8D-4E90-87B1-96341337FC42",
//   renewable_type: "D6F08661-5682-4915-AB0D-3BFBAB11979F",
//   renewable_source_solar: false,
//   renewable_source_wind: false,
//   renewable_source_hydro: false,
//   renewable_source_bio: false,
//   renewable_source_all: false,
//   renewable_source_other: false,
//   renewable_source_other_detail: "",
//   year: ""
// };