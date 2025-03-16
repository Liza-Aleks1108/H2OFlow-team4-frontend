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
