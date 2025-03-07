import * as Yup from "yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./SignUpForm.module.css";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { register as authUser } from "../../redux/auth/operations.js";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export const AuthFormContainer = ({ children, className }) => {
  return <div className={clsx(s.container, className)}>{children}</div>;
};
export const spritePath = "/sprite.svg";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpValidationSchema),
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
        if (error === 409) {
          toast.error("User have already exists");
        } else if (error === 400) {
          toast.error("Please enter a valid email");
        } else {
          toast.error("Sorry, registration is failed", {
            duration: 2000,
            position: "top-center",
          });
        }
      });
  };

  const signUpValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "An email address must end with a valid domain (e.g., .com, .net)."
      )
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Your password must have at least 8 characters.")
      .max(30, "Your password must have at most 30 characters")
      .required("Password is required"),

    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please repeat your password"),
  });

  return (
    <AuthFormContainer className={s.container}>
      <div className={s.signUpBox}>
        <h2 className={s.signUpTitle}>Sign Up</h2>
        <form className={s.signUpForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={s.signUpLabel}>
            Email
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
            Password
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
                {showPassword ? (
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
            Repeat password
            <div className={s.inputField}>
              <input
                className={clsx(s.input, {
                  [s.inputError]: errors.repeatPassword,
                })}
                type={showPassword ? "text" : "password"}
                placeholder="Repeat your password"
                {...register("repeatPassword", { required: true })}
              />
              <button
                className={s.showPasswordBtn}
                type="button"
                onClick={handleClickShowPassword}
              >
                {showPassword ? (
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
        <div className={s.afterSignUpBox}>
          <p className={s.afterSignUpText}> Already have an account?</p>
          <Link className={s.link} to="/signin"></Link>
        </div>
      </div>
    </AuthFormContainer>
  );
};

export default SignUpForm;
