
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SiteSetting } from "@/Interfaces/propsInterface";
const initialState: SiteSetting = {
  id: "",
  logo: "",
  address_name: "",
  address_detail: "",
  email: "",
  phone: "",
  hotline: "",
  facebook: "",
  instagram: "",
  x: "",
  copyright: "",
  social_media_detail: [],
};

const footerSlice = createSlice({
  name: "dataFooter",
  initialState,
  reducers: {
    setDataFooter: (state, action: PayloadAction<SiteSetting>) => {
      return action.payload;
    },
  },
});

export const { setDataFooter } = footerSlice.actions;
export default footerSlice.reducer;
