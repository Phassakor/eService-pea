import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "reducer",
  initialState: {
    selectedMenu: false,
    selectedSubmenu: "",
    value: false,
    value2: "",
    requestId: "",
    search: " ",
    isMobileSearch: false,
  },
  reducers: {
    updateSelectedMenu: (state, action) => {
      state.selectedMenu = action.payload;
    },
    updateSelectedSubmenu: (state, action) => {
      state.selectedSubmenu = action.payload;
    },
    updateOTPStatus: (state, action) => {
      state.value = action.payload;
    },
    updateRequestId: (state, action) => {
      state.requestId = action.payload;
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
  updateSelectedMenu,
  updateSelectedSubmenu,
  updateOTPStatus,
  updateRequestId,
  updateTimeStamp,
  updateSearchInput,
  updateIsMobileSearch,
} = slice.actions;

export default slice.reducer;
