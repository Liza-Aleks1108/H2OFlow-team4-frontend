import { createAsyncThunk } from "@reduxjs/toolkit";
import { requestAddWater, requestPatchWater } from "./services.js";

export const addWater = createAsyncThunk(
  "water/addWater",
  async (waterEntry, thunkAPI) => {
    try {
      console.log("Виклик addWater:", waterEntry);

      // Отримуємо актуальний токен з Redux або localStorage
      const { getState } = thunkAPI;
      const token = getState().user.token || localStorage.getItem("token");

      if (!token) {
        console.error("❌ Немає токена, користувач не авторизований");
        return thunkAPI.rejectWithValue("Користувач не авторизований");
      }

      const response = await requestAddWater(waterEntry, token);
      return response.data;
    } catch (error) {
      console.error(
        "❌ Помилка запиту addWater:",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const editWaterAmount = createAsyncThunk(
  "water/editWaterAmount",
  async ({ id, ...waterEntry }, thunkAPI) => {
    try {
      const response = await requestPatchWater({ id, ...waterEntry }, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
