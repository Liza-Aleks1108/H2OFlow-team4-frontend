import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { store } from "../store";
import { fetchAPI } from "../api.js";

export const getWaterMonth = createAsyncThunk(
  "water/getWaterMonth",
  async (yearMonth, thunkAPI) => {
    try {
      // console.log("Виклик getWaterMonth:", yearMonth);

      // Отримуємо актуальний токен з Redux або localStorage
      const { getState } = thunkAPI;
      const token = getState().user.token || localStorage.getItem("token");

      if (!token) {
        console.error("❌ Немає токена, користувач не авторизований");
        return thunkAPI.rejectWithValue("Користувач не авторизований");
      }

      const { data } = await fetchAPI.get(`/water/month?month=${yearMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      // console.error("❌ Помилка запиту getWaterMonth:", error);
      return thunkAPI.rejectWithValue("Помилка отримання води за місяць");
    }
  }
);

// GIFT FROM SANYA

export const addWater = createAsyncThunk(
  "water/addItem",
  async (body, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");
    try {
      const response = await fetchAPI.post(`/water`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
      const response = await requestPatchWater({ id, ...waterEntry }, token);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// from filters

export const getWaterPerDay = createAsyncThunk(
  "water/waterPerDay",
  async (date, thunkAPI) => {
    try {
      const { data } = await fetchAPI.get(`/water/day/${date}`);
      return data;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    }
  }
);

// SANYA SERVISES

export const requestPatchWater = async (water, token) => {
  const { data } = await userAPI.patch(
    `/water/${water.id}`,
    {
      amount: water.amount,
      date: water.date,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
};
