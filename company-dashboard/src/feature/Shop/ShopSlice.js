import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  value1: "Hengrabari",
  value2: "Hengrabari",
};

export const ShopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    changezooroad: (state) => {
      state.value1 = "Zoo Road";
      state.value2 =  "Zoo road";
      
    },
    changehengrabari: (state) => {
      state.value1 = "Hengrabari";
      state.value2 =  "Hengrabari";
    },
  },
});

// Action creators are generated for each case reducer function
export const { changezooroad, changehengrabari } = ShopSlice.actions;

export default ShopSlice.reducer;
