import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./SignUpForm.module.css";
import clsx from "clsx";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { register as authUser } from "../../redux/user/operations.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import { signUpValidationSchema } from "../../validationSchemas/authValidation.js";
import GoogleButton from "../GoogleButton/GoogleButton.jsx";

export const AuthFormContainer = ({ children, className }) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};
export const spritePath = "/sprite.svg";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowRepeatPassword = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(signUpValidationSchema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    const { email, password } = data;
    const correctEmail = email.toLowerCase();
    dispatch(authUser({ email: correctEmail, password }))
      .unwrap()
      .then(() => {
        reset();
        toast.success("Registration was successful.", {
          duration: 2000,
          position: "top-center",
          icon: "👏",
        });
        navigate("/tracker");
      })
      .catch((error) => {
        if (error?.response?.data.message === "Email in use") {
          toast.error("User has already exists", {
            duration: 2000,
            position: "top-center",
          });
        } else {
          toast.error("Sorry, registration failed", {
            duration: 2000,
            position: "top-center",
          });
        }
      });
  };

  return (
    <AuthFormContainer className={s.container}>
      <div className={s.signUpBox}>
        <h2 className={s.signUpTitle}>Sign Up</h2>
        <form className={s.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={s.signUpLabel}>
            <span className={s.signUpLabelText}>Email</span>
            <input
              type="email"
              placeholder="Enter your email"
              className={clsx(s.input, { [s.inputError]: errors.email })}
              {...register("email", {
                required: true,
              })}
            />
            <p className={s.errorMessage}>{errors.email?.message}</p>
          </label>

          <label className={s.signUpLabel}>
            <span className={s.signUpLabelText}>Password</span>
            <div className={s.inputField}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

          <label className={s.signUpLabel}>
            <span className={s.signUpLabelText}>Repeat password</span>
            <div className={s.inputField}>
              <input
                className={clsx(s.input, {
                  [s.inputError]: errors.repeatPassword,
                })}
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Repeat your password"
                {...register("repeatPassword", { required: true })}
              />
              <button
                className={s.showPasswordBtn}
                type="button"
                onClick={handleClickShowRepeatPassword}
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
            Sign Up
          </button>
        </form>
        <GoogleButton />
        <div className={s.afterSignUpBox}>
          <p className={s.afterSignUpText}> Already have an account?</p>
          <Link className={s.link} to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default SignUpForm;
