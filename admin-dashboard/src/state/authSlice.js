// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    // _id: ""
  },
  reducers: {
    setAuthChecked: (state) => {
    state.isLoggedIn = true
    // state._id = action.payload._id
    },
    deleteAuthChecked: (state) => {
    state.isLoggedIn = false
    // state._id = ""
      },
    
  },
});

export const { setAuthChecked, deleteAuthChecked } = authSlice.actions;
// export const selectUser = (state) => state.user.user;
export const selectAuthChecked = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
