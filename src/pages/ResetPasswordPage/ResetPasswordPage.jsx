import React from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../redux/user/operations.js";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../../components/Logo/Logo.jsx";
import PasswordResetForm from "../../components/PasswordResetForm/PasswordResetForm.jsx";
import AdvantagesSection from "../../components/AdvantagesSection/AdvantagesSection.jsx";
import s from "./ResetPasswordPage.module.css";
import { selectLoading } from "../../redux/user/selectors.js";
import Loader from "../../components/Loader/Loader.jsx";

const ResetPasswordPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleResetPassword = async (data) => {
    const { password, repeatPassword } = data;
    if (password !== repeatPassword) {
      toast.error("Passwords must match");
      return;
    }
    dispatch(resetPassword({ token, password }))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          toast.success("You are successfully reset password");
          navigate("/signin");
        } else {
          toast.error("Opps mistake, try again");
        }
      })
      .catch(() => {
        toast.error("Reset failed, try again");
      });
  };
  const isLoading = useSelector(selectLoading);
  return isLoading ? (
    <Loader />
  ) : (
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
