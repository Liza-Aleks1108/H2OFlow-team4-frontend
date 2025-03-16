import { createSlice } from "@reduxjs/toolkit";
import { editWaterAmount, getWaterMonth } from "./operations";

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

// deleteWater;

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
      .addCase(getWaterMonth.pending, handlePending)
      .addCase(getWaterMonth.rejected, handleRejected)
      .addCase(getWaterMonth.fulfilled, (state, { payload }) => {
        state.isLoadingMonth = false;
        state.isErrorMonth = null;
        state.monthData = payload;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.waterDate = action.payload;
      })
      .addCase(editWaterAmount.fulfilled, (state, action) => {
        state.waterDate = { ...state.waterDate, ...action.payload };
      })
      .addCase(getWaterPerDay.fulfilled, (state, action) => {
        state.day = action.payload;
      })

      .addMatcher(
        isAnyOf(
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
