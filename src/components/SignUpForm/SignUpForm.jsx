import * as Yup from "yup";
import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import s from "./SignUpForm.module.css";

const SignUpForm = () => {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(signUpValidationSchema),
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    const { email, password } = data;
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
      .max(32, "Your password must have at most 34 characters")
      .required("Password is required"),

    repeatPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please repeat your password"),
  });

  return (
    <div className={s.signUpBox}>
      <h2 className={s.signUpTitle}>Sign Up</h2>
      <form className={s.signUpForm} onSubmit={handleSubmit(onSubmit)}>
        <label className={s.signUpLabel}>
          Email
          <input
            className={s.signUpField}
            type="email"
            placeholder="Enter your email"
            {...register("email")}
          />
          {errors.email && <p className={s.error}>{errors.email.message}</p>}
        </label>
        <label className={s.signUpLabel}>
          Password
          <input
            className={s.signUpField}
            type="password"
            placeholder="Enter your password"
            {...register("password")}
          />
          {errors.password && (
            <p className={s.error}>{errors.password.message}</p>
          )}
        </label>
        <label className={s.signUpLabel}>
          Repeat password
          <input
            className={s.signUpField}
            type="password"
            placeholder="Repeat your password"
            {...register("repeatPassword")}
          />
          {errors.repeatPassword && (
            <p className={s.error}>{errors.repeatPassword.message}</p>
          )}
        </label>
        <button type="submit" className={s.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
