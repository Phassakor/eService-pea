// userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/Interfaces/propsInterface";

const initialState: Category[] = [{
    id: "",
    name: "",
    description: "",
    icon: "",
    display_flag: false,
    active_flag: false,
}];
const categorySlice = createSlice({
  name: "dataCategory",
  initialState,
  reducers: {
    setDataCategory: (state, action: PayloadAction<Category[]>) => {
      return action.payload;
    },
    
  },
});

export const { setDataCategory } = categorySlice.actions;
export default categorySlice.reducer;
