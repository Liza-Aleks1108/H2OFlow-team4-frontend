import React, { useEffect } from "react";
import s from "./ResetModal.module.css";
// import { FiX } from "react-icons/fi";

const ResetModal = ({ onClose, children }) => {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modalOverlay}>
      <div className={s.backdrop} onClick={handleBackdropClick}>
        {children}
      </div>
    </div>
  );
};

export default ResetModal;
