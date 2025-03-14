import React, { useState } from "react";
import s from "./ForgotPasswordForm.module.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.PreventDefault();
  };
  return (
    <div className={s.box}>
      <h2 className={s.title}>Recover password</h2>
      <form className={s.form} onSubmit={handleSubmit}>
        <label className={s.label}>
          <input
            className={s.input}
            type="email"
            placeholder="enter email address"
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
