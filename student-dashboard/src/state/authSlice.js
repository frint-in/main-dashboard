// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authChecked: JSON.parse(localStorage.getItem('auth')),
  },
  reducers: {
    setAuthChecked: (state) => {
      state.authChecked =  localStorage.setItem("auth", JSON.stringify("hi"));

    },
    deleteAuthChecked: (state) => {
        state.authChecked = localStorage.removeItem("auth");
      },
    
  },
});

export const { setAuthChecked, deleteAuthChecked } = authSlice.actions;
// export const selectUser = (state) => state.user.user;
export const selectAuthChecked = (state) => state.auth.authChecked;

export default authSlice.reducer;
