import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  authWithGoogle,
  fetchUserProfile,
  getUsersAmount,
  logIn,
  logOut,
  refreshUser,
  register,
  updateUserAvatar,
  updateUserProfile,
} from "./operations.js";
const handleAuthState = (state, status, action = null) => {
  switch (status) {
    case "pending":
      state.loading = true;
      state.error = null;
      state.isLoggedIn = false;
      break;
    case "fulfilled":
      state.userData = action.payload.data.user;
      state.token = action.payload.data.accessToken;
      state.isLoggedIn = true;
      state.loading = false;
      state.error = null;
      break;
    case "rejected":
      state.token = null;
      state.isLoggedIn = false;
      state.loading = false;
      state.error = action.payload;
      break;
    default:
      return state;
  }
};

export const initialState = {
  userData: {
    name: "User",
    email: null,
    gender: "woman",
    weight: 0,
    dailySportTime: 0,
    dailyNorm: 1500,
    avatarUrl: "img/avatar.png",
  },
  totalAmount: null,
  isLoggedIn: false,
  token: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetToken: (state, action) => {
      state.token = action.payload.token;
    },
    logoutToken: (state) => {
      state.userData = {};
      state.token = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => handleAuthState(state, "pending"))
      .addCase(register.fulfilled, (state, action) =>
        handleAuthState(state, "fulfilled", action)
      )
      .addCase(register.rejected, (state, action) =>
        handleAuthState(state, "rejected", action)
      )
      .addCase(logIn.pending, (state) => handleAuthState(state, "pending"))
      .addCase(logIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(logIn.rejected, (state, action) =>
        handleAuthState(state, "rejected", action)
      )

      .addCase(logOut.fulfilled, (state) => {
        state.userData = {};
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.userData = action.payload.user;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.token = null;
        state.userData = initialState.user.userData;
        state.isLoggedIn = false;
      })

      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userData = action.payload;
      })

      .addCase(updateUserProfile.fulfilled, (state, action) => {
        console.log("Updated user profile in store:", action.payload);
        state.userData = {
          ...state.userData,
          ...action.payload,
        };
      })
      .addCase(updateUserAvatar.fulfilled, (state, action) => {
        state.userData.avatarUrl = action.payload;
      })
      .addCase(getUsersAmount.fulfilled, (state, action) => {
        state.totalAmount = action.payload;
      })
      .addCase(authWithGoogle.pending, (state) => {
        handleAuthState(state, "pending");
      })
      .addCase(authWithGoogle.fulfilled, (state, action) => {
        state.userData = initialState.userData;
        state.token = action.payload.data.accessToken;
        state.isLoggedIn = true;
        state.loading = false;
        state.error = null;
        // handleAuthState(state, "fulfilled", action);
      })
      .addCase(authWithGoogle.rejected, (state, action) => {
        handleAuthState(state, "rejected", action);
      })

      .addMatcher(
        isAnyOf(
          logOut.pending,
          refreshUser.pending,
          fetchUserProfile.pending,
          updateUserProfile.pending,
          getUsersAmount.pending,
          updateUserAvatar.pending
        ),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        isAnyOf(
          logOut.rejected,
          refreshUser.rejected,
          fetchUserProfile.rejected,
          updateUserProfile.rejected,
          getUsersAmount.rejected,
          updateUserAvatar.rejected
        ),
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )
      .addMatcher(
        isAnyOf(
          logOut.fulfilled,
          refreshUser.fulfilled,
          fetchUserProfile.fulfilled,
          updateUserProfile.fulfilled,
          getUsersAmount.fulfilled,
          updateUserAvatar.fulfilled
        ),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { clearError, resetToken, logoutToken } = userSlice.actions;
export default userSlice.reducer;
