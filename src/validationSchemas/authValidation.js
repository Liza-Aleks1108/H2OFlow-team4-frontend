import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "An email address must end with a valid domain (e.g., .com, .net)."
    )
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Your password must have at least 8 characters.")
    .max(40, "Your password must have at most 40 characters")
    .required("Password is required"),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Please repeat your password"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      "An email address must end with a valid domain (e.g., .com, .net)."
    )
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Your password must have at least 8 characters.")
    .max(40, "Your password must have at most 40 characters")
    .required("Password is required"),
});
