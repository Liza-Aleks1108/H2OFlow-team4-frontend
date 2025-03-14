import React from "react";
import { BaseModal } from "../BaseModal/BaseModal.jsx";
import WaterForm from "../WaterForm/WaterForm.jsx";
import css from "./WaterModal.module.css";

const WaterModal = ({ isOpen, onClose, operationType }) => {
  const title =
    operationType === "add" ? "Add water" : "Edit the entered amount of water";

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css.waterModal}>
        <h2 className={css.title}>{title}</h2>
        <WaterForm operationType={operationType} onClose={onClose} />
      </div>
    </BaseModal>
  );
};

export default WaterModal;
