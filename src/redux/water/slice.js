import { createSlice } from "@reduxjs/toolkit";
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

const initialState = {
  water: {
    entries: [],
    loading: false,
    error: null,
  },
  month: {
    monthData: [],
    isLoadingMonth: false,
    isErrorMonth: null,
  },
  activeDate: null,
};

const waterSlice = createSlice({
  name: "water",
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

// GIFT FROM SANYA
import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "../initialState";
import { addWater, editWaterAmount } from "./operations";

const handlePending = (state) => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = null;
};

const waterSlice = createSlice({
  name: "water",
  initialState: initialState.water,
  reducers: {
    setDate(state, action) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(addWater.pending, handlePending)
      .addCase(addWater.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.entries = [...state.entries];
      })
      .addCase(addWater.rejected, handleRejected)
      .addCase(editWaterAmount.pending, handlePending)
      .addCase(editWaterAmount.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedEntry = action.payload;
        const index = state.entries.findIndex(
          (entry) => entry.id === updatedEntry.id
        );
        if (index !== -1) {
          state.entries[index] = updatedEntry;
        }
      })
      .addCase(editWaterAmount.rejected, handleRejected),
});

export const { setDate } = waterSlice.actions;
export const waterReducer = waterSlice.reducer;

// const waterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_WATER_DATA":
//       return { ...state, waterData: action.payload };
//     case "SET_ERROR":
//       return { ...state, error: action.payload };
//     case "SET_LOADING":
//       return { ...state, isLoading: action.payload };
//     default:
//       return state;
//   }
// };

// export default waterReducer;

// from filters
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
