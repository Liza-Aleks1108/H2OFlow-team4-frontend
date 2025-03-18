import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthFormContainer, spritePath } from "../SignUpForm/SignUpForm.jsx";
import { resetPasswordValidationSchema } from "../../validationSchemas/authValidation.js";
import s from "./PasswordResetForm.module.css";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const PasswordResetForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordValidationSchema),
    mode: "onChange",
    defaultValues: { password: "", repeatPassword: "" },
  });
  return (
    <div>
      <AuthFormContainer className={s.container}>
        <div className={s.resetBox}>
          <h2 className={s.resetTitle}>{t("passwordReset.title")}</h2>
          <form className={s.resetForm} onSubmit={handleSubmit(onSubmit)}>
            <label className={s.resetLabel}>
              <span className={s.labelText}>
                {t("passwordReset.newPassword")}
              </span>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder={t("passwordReset.passwordPlaceholder")}
                  className={clsx(s.input, {
                    [s.inputError]: errors.password,
                  })}
                  {...register("password", { required: true })}
                />
                <button
                  type="button"
                  onClick={handleClickShowPassword}
                  className={s.showPasswordBtn}
                >
                  {!showPassword ? (
                    <svg className={s.icon}>
                      <use href={`${spritePath}#icon-eye-off`}></use>
                    </svg>
                  ) : (
                    <svg className={s.icon}>
                      <use href={`${spritePath}#icon-eye-open`}></use>
                    </svg>
                  )}
                </button>
              </div>
              <p className={s.errorMessage}>{errors.password?.message}</p>
            </label>
            <label className={s.resetLabel}>
              <span className={s.labelText}>
                {t("passwordReset.repeatNewPassword")}
              </span>
              <div>
                <input
                  className={clsx(s.input, {
                    [s.inputError]: errors.repeatPassword,
                  })}
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder={t("passwordReset.repeatPasswordPlaceholder")}
                  {...register("repeatPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={handleClickShowRepeatPassword}
                  className={s.showPasswordBtn}
                >
                  {!showRepeatPassword ? (
                    <svg className={s.icon}>
                      <use href={`${spritePath}#icon-eye-off`}></use>
                    </svg>
                  ) : (
                    <svg className={s.icon}>
                      <use href={`${spritePath}#icon-eye-open`}></use>
                    </svg>
                  )}
                </button>
              </div>
              <p className={s.errorMessage}>{errors.repeatPassword?.message}</p>
            </label>
            <button type="submit" className={s.button}>
              {t("passwordReset.button")}
            </button>
          </form>
        </div>
      </AuthFormContainer>
    </div>
  );
};

export default PasswordResetForm;
