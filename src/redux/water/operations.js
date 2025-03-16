import { createAsyncThunk } from "@reduxjs/toolkit";
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

      const { oneMonth } = await fetchAPI.get(
        `/water/month?month=${yearMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      return oneMonth;
    } catch (error) {
      // console.error("❌ Помилка запиту getWaterMonth:", error);
      return thunkAPI.rejectWithValue("Помилка отримання води за місяць");
    }
  }
);

export const getWaterPerDay = createAsyncThunk(
  "water/waterPerDay",
  async (date, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");
    try {
      const { oneDay } = await fetchAPI.get(`/water/day/?day=${date}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return oneDay;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addWater = createAsyncThunk(
  "water/addItem",
  async (body, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");
    try {
      const { data } = await fetchAPI.post(`/water`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editWaterAmount = createAsyncThunk(
  "water/editItem",
  async (body, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");
    try {
      const { data } = await fetchAPI.patch(`/water/${body.id}`, body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  "water/deleteItem",
  async (id, thunkAPI) => {
    const token = thunkAPI.getState().user.token;
    if (!token) return thunkAPI.rejectWithValue("No token found");
    try {
      await fetchAPI.delete(`/water/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
