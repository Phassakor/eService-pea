// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MenuServeice } from "@/Interfaces/propsInterface";
const initialState: MenuServeice[] = [
  {
    id: "",
    fk_master_categories_id: "",
    master_categories: "",
    name: "",
    description: "",
    icon: "",
    content_type: "",
    content_detail: "",
    url: "",
    open_mode: "",
  }
];
const serviceSlice = createSlice({
  name: "dataServiceSlic",
  initialState,
  reducers: {
    setMenuService: (state, action: PayloadAction<MenuServeice[]>) => {
      return action.payload;
    },
  },
});

export const { setMenuService } = serviceSlice.actions;
export default serviceSlice.reducer;
