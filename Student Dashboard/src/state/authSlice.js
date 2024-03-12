// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authChecked: false,
  },
  reducers: {
    setAuthChecked: (state, action) => {
      state.authChecked = action.payload;
    },
    // setAuthCheckedFalse: (state) => {
    //     state.authChecked = false;
    //   },
    
  },
});

export const { setAuthChecked } = authSlice.actions;
// export const selectUser = (state) => state.user.user;
export const selectAuthChecked = (state) => state.auth.authChecked;

export default authSlice.reducer;
