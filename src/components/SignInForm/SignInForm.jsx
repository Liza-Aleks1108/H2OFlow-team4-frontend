import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./SignInForm.module.css";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/user/operations.js";
import toast from "react-hot-toast";
import { AuthFormContainer } from "../SignUpForm/SignUpForm.jsx";
import { Link, useNavigate } from "react-router-dom";
import { signInValidationSchema } from "../../validationSchemas/authValidation.js";
import GoogleButton from "../GoogleButton/GoogleButton.jsx";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm.jsx";
import ResetModal from "../ResetModal/ResetModal.jsx";
import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOpenModal = () => {
    console.log("Modal open button clicked!");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInValidationSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const correctEmail = email.toLowerCase();
    dispatch(logIn({ email: correctEmail, password }))
      .unwrap()
      .then(() => {
        reset();
        toast.success(t("login.success"), {
          duration: 2000,
          position: "top-center",
          icon: "👏",
        });
        navigate("/tracker");
      })
      .catch((error) => {
        if (error?.response?.data.message === "User not found") {
          toast.error(t("login.unauthorized"), {
            duration: 2000,
            position: "top-center",
          });
        } else {
          toast.error(t("login.failed"), {
            duration: 2000,
            position: "top-center",
          });
        }
      });
  };

  return (
    <AuthFormContainer className={s.container}>
      <div className={s.signUpBox}>
        <h2 className={s.signUpTitle}>{t("button.signIn")}</h2>
        <form className={s.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={s.signUpLabel}>
            <span className={s.signUpLabelText}>{t("login.email")}</span>
            <input
              type="email"
              placeholder={t("login.emailPlaceholder")}
              className={clsx(s.input, { [s.inputError]: errors.email })}
              {...register("email", {
                required: true,
              })}
            />
            <p className={s.errorMessage}>{errors.email?.message}</p>
          </label>

          <label className={s.signUpLabel}>
            <span className={s.signUpLabelText}>{t("login.password")}</span>
            <div className={s.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t("login.passwordPlaceholder")}
                className={clsx(s.input, {
                  [s.inputError]: errors.password,
                })}
                {...register("password", { required: true })}
              />
              <button
                className={s.showPasswordBtn}
                type="button"
                onClick={handleClickShowPassword}
              >
                {!showPassword ? (
                  <svg className={s.icon}>
                    <use href="/sprite.svg#icon-eye-off"></use>
                  </svg>
                ) : (
                  <svg className={s.icon}>
                    <use href="/sprite.svg#icon-eye-open"></use>
                  </svg>
                )}
              </button>
            </div>
            <button
              type="button"
              className={s.forgotButton}
              onClick={handleOpenModal}
            >
              {t("login.forgotPassword")}
            </button>
            <p className={s.errorMessage}>{errors.password?.message}</p>
          </label>

          <button type="submit" className={s.button}>
            {t("button.signIn")}
          </button>
        </form>
        <GoogleButton />
        <div className={s.afterSignUpBox}>
          <p className={s.afterSignUpText}>{t("login.noAccount")}</p>
          <Link className={s.link} to="/signup">
            {t("button.signUp")}
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <ResetModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ForgotPasswordForm onClose={handleCloseModal} />
        </ResetModal>
      )}
    </AuthFormContainer>
  );
};

export default SignInForm;
