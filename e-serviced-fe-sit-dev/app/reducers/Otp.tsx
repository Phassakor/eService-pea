import { createSlice } from "@reduxjs/toolkit";

const otpSlice = createSlice({
  name: "otp",
  initialState: { value: false, value2: "" },
  reducers: {
    updateOTPStatus: (state, action) => {
      state.value = action.payload;
    },
    updateTimeStamp: (state, action) => {
      state.value2 = action.payload;
    },
  },
});

export const { updateOTPStatus, updateTimeStamp } = otpSlice.actions;

export default otpSlice.reducer;
