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

// from filters

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const waterAPI = axios.create({
  baseURL: "https://h2oflow-team4-backend.onrender.com",
  withCredentials: true,
});

export const getWaterPerDay = createAsyncThunk(
  "water/waterPerDay",
  async (date, thunkAPI) => {
    try {
      const { data } = await waterAPI.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

export const getWaterPerMonth = createAsyncThunk(
  "water/waterPerMonth",
  async (yearMonth, thunkAPI) => {
    try {
      const { data } = await waterAPI.get(`/water/month/${yearMonth}`);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);
