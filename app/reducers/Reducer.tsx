import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reducer",
  initialState: {
    value: false,
    value2: "",
    search: " ",
    isMobileSearch: false,
  },
  reducers: {
    updateOTPStatus: (state, action) => {
      state.value = action.payload;
    },
    updateTimeStamp: (state, action) => {
      state.value2 = action.payload;
    },
    updateSearchInput: (state, action) => {
      state.search = action.payload;
    },
    updateIsMobileSearch: (state, action) => {
      state.isMobileSearch = action.payload;
    },
  },
});

export const {
  updateOTPStatus,
  updateTimeStamp,
  updateSearchInput,
  updateIsMobileSearch,
} = slice.actions;

export default slice.reducer;
