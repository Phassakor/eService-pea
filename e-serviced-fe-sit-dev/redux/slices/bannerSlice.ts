// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SiteCarousels } from "@/Interfaces/propsInterface";
const initialState: SiteCarousels[] = [
  {
    id: "",
    type: 0,
    name: "",
    description: "",
    content_type: "",
    content_detail: "",
    url: "",
    button_text: "",
    image: "",
    created_date: "",
    start_date: "",
    end_date: "",
    display_flag: false,
    active_flag: false,
  },
];

const bannerSlice = createSlice({
  name: "dataBanner",
  initialState,
  reducers: {
    setDataBanner: (state, action: PayloadAction<SiteCarousels[]>) => {
      return action.payload;
    },
  },
});

export const { setDataBanner } = bannerSlice.actions;
export default bannerSlice.reducer;
