import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  deleteWater,
  editWaterAmount,
  getWaterMonth,
  getWaterPerDay,
} from "./operations";

const initialState = {
  waterDate: {
    _id: "",
    volume: "",
    day: "",
    time: "",
  },
  day: [],
  month: [],
  activeDate: null,
  totalVolume: 0,
  loading: false,
  error: false,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
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
      .addCase(getWaterMonth.fulfilled, (state, { payload }) => {
        state.month = payload;
      })
      .addCase(getWaterPerDay.fulfilled, (state, action) => {
        state.day = action.payload;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.waterDate = action.payload;
      })
      .addCase(editWaterAmount.fulfilled, (state, action) => {
        state.waterDate = { ...state.waterDate, ...action.payload };
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.day = state.day.filter((item) => item.id !== action.payload);
      })
      .addMatcher(
        isAnyOf(
          getWaterMonth.pending,
          addWater.pending,
          editWaterAmount.pending,
          getWaterPerDay.pending,
          deleteWater.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getWaterMonth.fulfilled,
          addWater.fulfilled,
          editWaterAmount.fulfilled,
          getWaterPerDay.fulfilled,
          deleteWater.fulfilled
        ),
        (state) => {
          state.loading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          getWaterMonth.rejected,
          addWater.rejected,
          editWaterAmount.rejected,
          getWaterPerDay.rejected,
          deleteWater.rejected
        ),
        (state) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default waterSlice.reducer;
