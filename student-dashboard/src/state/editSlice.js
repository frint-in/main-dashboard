// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const editSlice = createSlice({
  name: "user",
  initialState: {
  avatar: {
    url: ''
  },
  resume: ''
  },
  reducers: {
    setAvatarUrl: (state, action) => {
      state.avatar.url =  action.payload;

    },
    setResumeUrl: (state, action) => {
        state.resume = action.payload;
      },
    
  },
});

export const { setAvatarUrl, setResumeUrl } = editSlice.actions;
// export const selectUser = (state) => state.user.user;
// export const selectResume = (state) => state.user.resume;
// export const selectAvatar = (state) => state.user.avatar;
// export const selectUser = (state) => state.user;

export default editSlice.reducer;
