import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import { store } from "../store";

export const waterAPI = axios.create({
  baseURL: "https://h2oflow-team4-backend.onrender.com",
  withCredentials: true,
});

export const getWaterMonth = createAsyncThunk(
  "water/getWaterMonth",
  async (yearMonth, thunkAPI) => {
    try {
      console.log("Виклик getWaterMonth:", yearMonth);

      // Отримуємо актуальний токен з Redux або localStorage
      const { getState } = thunkAPI;
      const token = getState().user.token || localStorage.getItem("token");

      if (!token) {
        console.error("❌ Немає токена, користувач не авторизований");
        return thunkAPI.rejectWithValue("Користувач не авторизований");
      }

      const { data } = await waterAPI.get(`/water/month?month=${yearMonth}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    } catch (error) {
      console.error("❌ Помилка запиту getWaterMonth:", error);
      return thunkAPI.rejectWithValue("Помилка отримання води за місяць");
    }
  }
);
