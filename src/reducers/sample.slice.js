import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
};

const sampleSlice = createSlice({
  name: "sample",
  initialState,
  reducers: {
    sampleData: (state) => {
      state.loading = true;
    },
  },
});

export const { sampleData } = sampleSlice.actions;
export const selector = (state) => state.loading;
export default sampleSlice.reducer;
