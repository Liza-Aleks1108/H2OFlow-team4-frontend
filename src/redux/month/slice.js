import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import { getWaterMonth } from "./operations";

const handlePending = (state) => {
  state.isLoadingMonth = true;
};

const handleRejected = (state, action) => {
  state.isLoadingMonth = false;
  // console.log("❌ Отримана помилка:", action.payload);
  state.isErrorMonth =
    typeof action.payload === "string"
      ? action.payload
      : "Помилка завантаження!";
};

const monthSlice = createSlice({
  name: "month",
  initialState: initialState.month,
  reducers: {
    updateActiveDate: (state, action) => {
      state.activeDate = action.payload;
    },
    resetActiveDate: (state) => {
      state.activeDate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getWaterMonth.pending, handlePending)
      .addCase(getWaterMonth.rejected, handleRejected)
      .addCase(getWaterMonth.fulfilled, (state, { payload }) => {
        state.isLoadingMonth = false;
        state.isErrorMonth = null;
        state.monthData = payload;
      });
  },
});

export default monthSlice.reducer;
