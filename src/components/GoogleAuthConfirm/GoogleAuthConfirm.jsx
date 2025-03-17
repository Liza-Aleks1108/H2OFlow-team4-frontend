import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { authWithGoogle } from "../../redux/user/operations.js";

const GoogleAuthConfirm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const handleGoogleAuth = () => {
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
  return <div>Auth with Google...</div>;
};

export default GoogleAuthConfirm;
