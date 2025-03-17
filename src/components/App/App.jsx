import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectToken } from "../../redux/user/selectors.js";
import {
  fetchUserProfile,
  getUsersAmount,
  refreshUser,
  setAuthHeader,
} from "../../redux/user/operations.js";
import { Toaster } from "react-hot-toast";
import SharedLayout from "../SharedLayout.jsx";

// Використовуємо lazy load для сторінок
const HomePage = lazy(() => import("../../pages/HomePage/HomePage.jsx"));
const TrackerPage = lazy(() => import("../../pages/TrackerPage/TrackerPage"));
const SignUpPage = lazy(() => import("../../pages/SignUpPage/SignUpPage.jsx"));
const SignInPage = lazy(() => import("../../pages/SignInPage/SignInPage.jsx"));
const GoogleAuthConfirm = lazy(() =>
  import("../GoogleAuthConfirm/GoogleAuthConfirm.jsx")
);
const ResetPasswordPage = lazy(() =>
  import("../../pages/ResetPasswordPage/ResetPasswordPage.jsx")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage.jsx")
);

const App = () => {
  const isRehydrated = useSelector(
    (state) => state?._persist?.rehydrated || false
  );
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!isRehydrated) return;

    if (token) {
      setAuthHeader(token);

      if (!isLoggedIn) {
        dispatch(refreshUser());
      } else {
        dispatch(fetchUserProfile());
      }
    } else {
      dispatch(refreshUser());
    }
  }, [dispatch, token, isLoggedIn, isRehydrated]);

  useEffect(() => {
    dispatch(getUsersAmount());
  }, [dispatch]);

  return (
    <Router>
      <Toaster position={"top-center"} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<SharedLayout />}>
            <Route index element={<HomePage />} />
            <Route path="tracker" element={<TrackerPage />} />
            <Route path="signup" element={<SignUpPage />} />
            <Route path="signin" element={<SignInPage />} />
            <Route path="/auth/confirm-oauth" element={<GoogleAuthConfirm />} />
            <Route
              path="/auth/reset-password"
              element={<ResetPasswordPage />}
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
