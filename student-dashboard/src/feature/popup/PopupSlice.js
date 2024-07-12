import { createSlice } from '@reduxjs/toolkit';



const initialState = { 
  value: false,
//   value2: "today"
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    popup: (state ,actions) => {
      state.value = !actions.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { popup } = popupSlice.actions;

export default popupSlice.reducer;
