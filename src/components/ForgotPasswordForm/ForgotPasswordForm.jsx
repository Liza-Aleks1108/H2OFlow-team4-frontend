import React, { useState } from "react";
import s from "./ForgotPasswordForm.module.css";
import { useDispatch } from "react-redux";
import { requestForResetPassword } from "../../redux/user/operations.js";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { useTranslation } from "react-i18next";

const ForgotPasswordForm = ({ onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(requestForResetPassword(email))
      .unwrap()
      .then(() => {
        toast.success(t("forgotPassword.success"));
        onClose();
      })
      .catch(() => {
        toast.error(t("forgotPassword.error"));
      });
  };
  return (
    <div className={s.box}>
      <button className={s.closeButton} onClick={onClose}>
        <FiX className={s.icon} />
      </button>
      <h2 className={s.title}>{t("forgotPassword.title")}</h2>

      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          <input
            className={s.input}
            type="email"
            placeholder={t("forgotPassword.placeholder")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={s.button}>
          {t("forgotPassword.btnToReset")}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
