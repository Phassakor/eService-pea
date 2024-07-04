// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SiteCarousels } from "@/Interfaces/propsInterface";

const initialState: SiteCarousels[] = [{
    id: "",
    type: 0,
    name: "",
    description: "",
    content_type: "",
    content_detail: "",
    url: "",
    button_text: "",
    image: "",
    start_date: "",
    end_date: "",
    display_flag: false,
    active_flag: false,
}];

const carouselsSlice = createSlice({
  name: "dataCarousels",
  initialState,
  reducers: {
    setDataCarousels: (state, action: PayloadAction<SiteCarousels[]>) => {
      return action.payload;
    },
  },
});

export const { setDataCarousels } = carouselsSlice.actions;
export default carouselsSlice.reducer;