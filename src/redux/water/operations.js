import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestAddWater, requestPatchWater } from "./services.js";

export const addWater = createAsyncThunk(
  "water/addWater",
  async (waterEntry, thunkAPI) => {
    try {
      const response = await requestAddWater(waterEntry);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editWaterAmount = createAsyncThunk(
  "water/editWaterAmount",
  async ({ id, ...waterEntry }, thunkAPI) => {
    try {
      const response = await requestPatchWater({ id, ...waterEntry });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
