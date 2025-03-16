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

// SANYA SERVISES
import { userAPI } from "../user/operations.js";
import { fetchAPI } from "../api.js";

export const requestAddWater = async (water, token) => {
  try {
    const { data } = await userAPI.post("/water", water, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Помилка при відправці запиту:", error.response?.data);
    throw error;
  }
};

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
