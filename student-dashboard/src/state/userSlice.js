import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    details: null, // This will hold user details
  },
  reducers: {
    setUserDetails: (state, action) => {
      state.details = action.payload;
    },
    clearUserDetails: (state) => {
      state.details = null;
    },
  },
});

export const { setUserDetails, clearUserDetails } = userSlice.actions;

export const selectUserDetails = (state) => state.user.details;

export default userSlice.reducer;
