import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordValidationSchema } from "../../validationSchemas/authValidation.js";
import { AuthFormContainer } from "../SignUpForm/SignUpForm.jsx";

const PasswordResetForm = () => {
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
      <AuthFormContainer></AuthFormContainer>
    </div>
  );
};

export default PasswordResetForm;
