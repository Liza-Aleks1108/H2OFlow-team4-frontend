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
