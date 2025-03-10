import React from "react";
import { userAPI } from "../../redux/user/operations.js";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import GoogleButtonForAuth from "../GoogleButtonForAuth/GoogleButtonForAuth.jsx";
import s from "./GoogleButton.module.css";

const GoogleButton = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await userAPI.get("/auth/get-oauth-url");
      window.location.href = response.data.data.url;
    } catch (error) {
      console.error("Error to get Google OAuth URL", error);
      toast.error("Sorry, Google OAuth URL is missing");
    }
  };
  return (
    <div>
      <GoogleButtonForAuth className={s.button} onClick={handleGoogleLogin}>
        <FcGoogle className={s.icon} />
        Sign Up with Google
      </GoogleButtonForAuth>
    </div>
  );
};

export default GoogleButton;
