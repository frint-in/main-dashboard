import { createSlice } from '@reduxjs/toolkit';


const today = () => {
    return new Date().toISOString().split('T')[0];
  };

const thismonth = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    return `${year}-${month}`;
};
const thisyear = () => {
    const today = new Date();
    const year = today.getFullYear();
    return `${year}`
};

const initialState = { 
  value: 'total',
//   value2: "today"
};

export const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    changetoday: (state) => {
      state.value = today();
      state.value2 = "today";
    },
    changethismonth: (state) => {
      state.value = thismonth()
      state.value2 = "thismonth";
    },
    changethisyear: (state) => {
        state.value = thisyear()
        state.value2 = "thisyear";
    },
    changetotal: (state) => {
        state.value = "total"
    },
  },
});

// Action creators are generated for each case reducer function
export const { changethismonth, changethisyear, changetoday, changetotal } = dateSlice.actions;

export default dateSlice.reducer;
