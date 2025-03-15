import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { logoutToken, resetToken } from "./slice.js";

export const userAPI = axios.create({
  baseURL: "https://h2oflow-team4-backend.onrender.com",
  withCredentials: true,
});

export const fetchUserProfile = createAsyncThunk(
  "user/fetchProfile",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.get("/users");
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.message);
    }
  }
);

userAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.warn("401 detected, attempting to refresh token");
      try {
        const { token } = await store.dispatch(refreshUser()).unwrap();
        if (!token) throw new Error("Token refresh failed");
        setAuthHeader(token);
        error.config.headers["Authorization"] = `Bearer ${token}`;
        return userAPI.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed, logging out");
        store.dispatch(logoutToken());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const setAuthHeader = (token) => {
  userAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
export const clearAuthHeder = () => {
  userAPI.defaults.headers.common["Authorization"] = "";
};

export const register = createAsyncThunk(
  "user/register",
  async (userData, thunkAPI) => {
    try {
      const response = await userAPI.post("/users/register", userData);
      setAuthHeader(response.data.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);
export const logIn = createAsyncThunk(
  "user/login",
  async (userData, thunkAPI) => {
    try {
      const response = await userAPI.post("/users/login", userData, {
        withCredentials: true,
      });

      setAuthHeader(response.data.data.accessToken);
      console.log(
        "Токен установлен:",
        userAPI.defaults.headers.common["Authorization"]
      );

      const userProfile = await thunkAPI.dispatch(fetchUserProfile()).unwrap();
      return { token: response.data.data.accessToken, user: userProfile };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.status);
    }
  }
);

export const logOut = createAsyncThunk("user/logout", async (_, thunkAPI) => {
  try {
    await userAPI.post("users/logout");
    clearAuthHeder();
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.status);
  }
});

export const refreshUser = createAsyncThunk(
  "user/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const { data } = await userAPI.post(
        "users/refresh",
        {},
        { withCredentials: true }
      );
      const newAccessToken = data.accessToken;
      thunkAPI.dispatch(resetToken(newAccessToken));
      const userProfile = await thunkAPI.dispatch(fetchUserProfile()).unwrap();
      return { token: newAccessToken, user: userProfile };
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.message);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userDataToUpdate, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.user.token;
    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }
    try {
      const { data } = await userAPI.patch("/users", userDataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      return data.user;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.message);
    }
  }
);

export const getUsersAmount = createAsyncThunk(
  "user/getUsersAmount",
  async (_, thunkAPI) => {
    try {
      const { data } = await userAPI.get("/users/count");
      return data.count;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const authWithGoogle = createAsyncThunk(
  "user, authWithGoogle",
  async (code, thunkAPI) => {
    try {
      const response = await userAPI.post("/auth/google/confirm-google-auth", {
        code,
      });
      const { accessToken, user } = response.data.data;
      setAuthHeader(accessToken);
      localStorage.setItem("accessToken", accessToken);
      return { accessToken, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const requestForResetPassword = createAsyncThunk(
  "user/requestForResetPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await userAPI.post("/users/request-reset-email", {
        email,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await userAPI.post("/users/reset-password", {
        token,
        password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
