import { createSlice } from "@reduxjs/toolkit";
import { getWaterPerDay, getWaterPerMonth } from "./operations";
import { initialState } from "../initialState";

const waterSlice = createSlice({
  name: "water",
  initialState: initialState.water,
  extraReducers: (builder) => {
    builder
      .addCase(getWaterPerDay.pending)
      .addCase(getWaterPerDay.fulfilled, (state, { payload }) => {
        state.perDay = payload.date;
      })
      .addCase(getWaterPerDay.rejected)
      .addCase(getWaterPerMonth.pending)
      .addCase(getWaterPerMonth.fulfilled, (state, { payload }) => {
        state.perMonth = payload.date;
      })
      .addCase(getWaterPerMonth.rejected);
  },
});

export default waterSlice.reducer;
