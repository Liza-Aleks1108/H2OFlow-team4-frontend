import React, { useState } from "react";
import s from "./ForgotPasswordForm.module.css";
import { useDispatch } from "react-redux";
import { requestForResetPassword } from "../../redux/user/operations.js";
import toast from "react-hot-toast";

const ForgotPasswordForm = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(requestForResetPassword(email))
      .unwrap()
      .then(() => {
        toast.success("Reset link was successfully send. CHECK YOUR EMAIL");
        onClose();
      })
      .catch(() => {
        toast.error("Ooopsss... troubles, try again");
      });
  };
  return (
    <div className={s.box}>
      <h2 className={s.title}>Recover password</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          <input
            className={s.input}
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit" className={s.button}>
          Send link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
