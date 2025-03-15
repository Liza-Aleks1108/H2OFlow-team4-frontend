import React, { useState } from "react";
import { useForm } from "react-hook-form";
import s from "./SignInForm.module.css";
import clsx from "clsx";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/user/operations.js";
import toast from "react-hot-toast";
import { AuthFormContainer } from "../SignUpForm/SignUpForm.jsx";
import { Link, useNavigate } from "react-router-dom";
// import { signInValidationSchema } from "../../validationSchemas/authValidation.js";
import GoogleButton from "../GoogleButton/GoogleButton.jsx";
import { BaseModal } from "../BaseModal/BaseModal.jsx";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm.jsx";

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleOpenModal = () => {
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
    // resolver: yupResolver(signInValidationSchema),
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
        toast.success("You are successfully logged in!", {
          duration: 2000,
          position: "top-center",
          icon: "👏",
        });
        navigate("/tracker");
      })
      .catch((error) => {
        if (error?.response?.data.message === "User not found") {
          toast.error("Unauthorized user", {
            duration: 2000,
            position: "top-center",
          });
        } else {
          toast.error("Sorry, login failed. Please try again.", {
            duration: 2000,
            position: "top-center",
          });
        }
      });
  };

  return (
    <AuthFormContainer className={s.container}>
      <div className={s.signUpBox}>
        <h2 className={s.signUpTitle}>Sign In</h2>
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
                    <use href="/sprite.svg#icon-eye-off"></use>
                  </svg>
                ) : (
                  <svg className={s.icon}>
                    <use href="/sprite.svg#icon-eye-open"></use>
                  </svg>
                )}
              </button>
            </div>
            <p className={s.errorMessage}>{errors.password?.message}</p>
          </label>

          <button type="submit" className={s.button}>
            Sign In
          </button>
          <button
            type="button"
            className={s.forgotButton}
            onClick={handleOpenModal}
          >
            I forgot my password
          </button>
        </form>
        <GoogleButton />
        <div className={s.afterSignUpBox}>
          <p className={s.afterSignUpText}> Don't have an account?</p>
          <Link className={s.link} to="/signup">
            Sign Up
          </Link>
        </div>
      </div>
      {isModalOpen && (
        <BaseModal onClose={handleCloseModal}>
          <ForgotPasswordForm onClose={handleCloseModal} />
        </BaseModal>
      )}
    </AuthFormContainer>
  );
};

export default SignInForm;
