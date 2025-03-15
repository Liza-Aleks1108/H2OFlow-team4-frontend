import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/user/operations.js";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo.jsx";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm.jsx";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import s from "./ResetPasswordPage.module.css";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleResetPassword = async (data) => {
    const { password, repeatPassword } = data;
    if (password !== repeatPassword) {
      toast.error("Passwords must match");
      return;
    }
    dispatch(resetPassword({ token, password }))
      .unwrap()
      .then(() => {
        toast.success("You are successfully reset password");
        navigate("/signin");
      })
      .catch(() => {
        toast.error("Reset failed, try again");
      });
  };
  return (
    <div className={s.resetWrapper}>
      <div className={s.container}>
        <div className={s.box}>
          <Logo />
          <PasswordResetForm onSubmit={handleResetPassword} />
        </div>
        <div className={s.advantagesSection}>
          <AdvantagesSection />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
