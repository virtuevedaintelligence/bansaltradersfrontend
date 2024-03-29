import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "../../services/UserService";

export const usersOTPGenAction = createAsyncThunk("users-action-gen", async (user) => {
  const otpResponse = UserService.generateOtp(user);
  return (await otpResponse).data;
});

export const usersOTPVerifyAction = createAsyncThunk("users-action-verify", async (user) => {
  const otpResponse = UserService.verifyOtp(user);
  return (await otpResponse).data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoadingOTPGen: false,
    dataOTPGen: null,
    isErrorOTPGen: false,
    isLoadingOTPVerify: false,
    dataOTPVerify: null,
    isErrorOTPVerify: false,
  },
  extraReducers: (builder) => {
    builder.addCase(usersOTPGenAction.pending, (state, action) => {
      state.isLoadingOTPGen = true;
    });

    builder.addCase(usersOTPGenAction.fulfilled, (state, action) => {
      state.isLoadingOTPGen = false;
      state.dataOTPGen = action.payload;
    });

    builder.addCase(usersOTPGenAction.rejected, (state, action) => {
      state.isErrorOTPGen = true;
    });

    builder.addCase(usersOTPVerifyAction.pending, (state, action) => {
      state.isLoadingOTPVerify = true;
    });

    builder.addCase(usersOTPVerifyAction.fulfilled, (state, action) => {
      state.isLoadingOTPVerify = false;
      state.dataOTPVerify = action.payload;
    });

    builder.addCase(usersOTPVerifyAction.rejected, (state, action) => {
      state.isErrorOTPVerify = true;
      state.dataOTPVerify = action.payload;
    });
  },
});

export default userSlice.reducer;
