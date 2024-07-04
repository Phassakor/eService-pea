export const dataTime = [
  { label: "ช่วงเช้า (9.00-12.00)", value: "morning" },
  { label: "ช่วงบ่าย (13.00-16.00)", value: "afternoon" },
];
export const dataPackage = [
  { label: "Package 1", value: "package1" },
  { label: "Package 2", value: "package2" },
  { label: "Package 3", value: "package3" },
  { label: "Package 4", value: "package4" },
];

export const dataRenewableEnergy = [
  {
    name: "renewable_source_solar",
    label: "พลังงานแสงอาทิตย์ (Solar)",
    value: "S",
  },
  { name: "renewable_source_wind", label: "พลังงานลม (Wind) ", value: "W" },
  { name: "renewable_source_hydro", label: "พลังงานน้ำ (Hydro)", value: "H" },
  {
    name: "renewable_source_bio",
    label: "พลังงานชีวมวล/ชีวภาพ (Biomass/Biogas)",
    value: "B",
  },
  {
    name: "renewable_source_all",
    label: "ได้ทุกประเภทเชื้อเพลิง",
    value: "ALL",
  },
  { name: "renewable_source_other", label: "อื่นๆ (โปรดระบุ)", value: "M" },
];
export const voltageData = [
  { label: "22-33 kV", value: "22" },
  { label: "115 kV", value: "115" },
];
export const serviceRequired = [{ label: "เพิ่ม", value: "ADD" }];
export const electricPlaceData = [
  { label: "บ้าน", value: "H" },
  { label: "โรงงาน", value: "INDUS" },
];

export const electricalWireData = [
  { label: "สายไฟฟ้าแรงสูง", value: "H" },
  { label: "สายเคเบิลใยแก้วนำแสง", value: "M" },
  { label: "สายไฟฟ้าแรงต่ำ", value: "L" },
];

export const imageModalData = [
  {
    modalName: "M",
    path: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ56YyOIu4fdjlR3YjPyS9oWnMuDm0s_ianuQ&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnbeLPju82FkYz-uVP2kK0lPckXH6Ptq2iIA&s",
    ],
    title: "วิธีดูหมายเลขเครื่องวัด",
  },
  {
    modalName: "B",
    path: [], //2
    title: "ภาพตัวอย่าง Main Braker",
  },
  {
    modalName: "EW",
    path: [], //1
    title: "ภาพตัวอย่าง แนวสายไฟ",
  },
  {
    modalName: "CA",
    path: [], //2
    title: "วิธีดูหมายเลขผู้ใช้ไฟฟ้า",
  },
];
export const quantityKwData = [
  { label: "60", value: "60" },
  { label: "120", value: "120" },
  { label: "300", value: "300" },
  { label: "500", value: "500" },
  { label: "800", value: "800" },
  { label: "1000", value: "1000" },
];
