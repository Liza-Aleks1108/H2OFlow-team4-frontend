import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TrackerPage from "../../pages/TrackerPage/TrackerPage";

import { useState } from "react";
import "./App.module.css";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import SignUpPage from "../../pages/SignUpPage/SignUpPage.jsx";
import { useDispatch, useSelector } from "react-redux";
import SignInPage from "../../pages/SignInPage/SignInPage.jsx";
import { selectIsLoggedIn, selectToken } from "../../redux/user/selectors.js";
import { refreshUser, setAuthHeader } from "../../redux/user/operations.js";
import SharedLayout from "../../../SharedLayout.jsx";
import { Toaster } from "react-hot-toast";
import GoogleAuthConfirm from "../GoogleAuthConfirm/GoogleAuthConfirm.jsx";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage.jsx";

const App = () => {
  const { rehydrated } = useSelector((state) => state._persist || {});
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  useEffect(() => {
    if (!rehydrated) return;
    console.log("Persisted state rehydrated:", token);

    if (token) {
      setAuthHeader(token);
      if (!isLoggedIn) {
        dispatch(refreshUser());
      }
    } else {
      dispatch(refreshUser());
    }
  }, [dispatch, token, isLoggedIn, rehydrated]);

  return (
    <Router>
      <Toaster position={"top-center"} />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="tracker" element={<TrackerPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="signin" element={<SignInPage />} />
          <Route path="/auth/confirm-oauth" element={GoogleAuthConfirm} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
