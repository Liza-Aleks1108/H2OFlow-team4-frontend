import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authWithGoogle } from "../../redux/user/operations.js";
import { useTranslation } from "react-i18next";

const GoogleAuthConfirm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleGoogleAuth = () => {
      const { t } = useTranslation();
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        dispatch(authWithGoogle(code)).then(() => {
          navigate("/tracker");
        });
      }
    };
    handleGoogleAuth();
  }, [location, navigate, dispatch]);
  return <div>{t("google.googleAuth")}</div>;
};

export default GoogleAuthConfirm;
