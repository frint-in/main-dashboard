import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    details: null, 
  },
  reducers: {
    setCompanyDetails: (state, action) => {
      state.details = action.payload;
    },
    deleteCompanyDetails: (state) => {
      state.details = null;
    },
  },
});

export const { setCompanyDetails, deleteCompanyDetails } = companySlice.actions;

export const selectCompanyDetails = (state) => state.company.details;

export default companySlice.reducer;
