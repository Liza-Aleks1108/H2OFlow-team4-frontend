import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordValidationSchema } from "../../validationSchemas/authValidation.js";
import { AuthFormContainer, spritePath } from "../SignUpForm/SignUpForm.jsx";
import clsx from "clsx";
import s from "./PasswordResetForm.module.css";

const PasswordResetForm = ({ onSubmit }) => {
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
    // resolver: yupResolver(resetPasswordValidationSchema),
    mode: "onChange",
    defaultValues: { password: "", repeatPassword: "" },
  });
  return (
    <div>
      <AuthFormContainer className={s.container}>
        <div className={s.resetBox}>
          <h2 className={s.resetTitle}>Reset Password</h2>
          <form className={s.resetForm} onSubmit={handleSubmit(onSubmit)}>
            <label className={s.resetLabel}>
              <span className={s.labelText}>New Password</span>
              <div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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
              <span className={s.labelText}>Repeat new password</span>
              <div>
                <input
                  className={clsx(s.input, {
                    [s.inputError]: errors.repeatPassword,
                  })}
                  type={showRepeatPassword ? "text" : "password"}
                  placeholder="Repeat your password"
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
              Reset password
            </button>
          </form>
        </div>
      </AuthFormContainer>
    </div>
  );
};

export default PasswordResetForm;
