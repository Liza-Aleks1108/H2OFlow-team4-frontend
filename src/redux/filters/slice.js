import { createSlice } from "@reduxjs/toolkit";
import { getWaterPerDay, getWaterPerMonth } from "./operations";

const initialState = {
  perDay: [],
  perMonth: [],
  isLoading: false,
};

const handleLoading = (state) => {
  state.isLoading = true;
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getWaterPerDay.pending, handleLoading)
      .addCase(getWaterPerDay.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.perDay = payload.date;
      })
      .addCase(getWaterPerDay.rejected, console.log(error))
      .addCase(getWaterPerMonth.pending, handleLoading)
      .addCase(getWaterPerMonth.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.perMonth = payload.date;
      })
      .addCase(getWaterPerMonth.rejected, console.log(error));
  },
});

export const waterReducer = waterSlice.reducer;
