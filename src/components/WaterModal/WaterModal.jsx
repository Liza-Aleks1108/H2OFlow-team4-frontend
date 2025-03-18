import React from "react";
import { BaseModal } from "../BaseModal/BaseModal.jsx";
import WaterForm from "../WaterForm/WaterForm.jsx";
import css from "./WaterModal.module.css";
import { useSelector } from "react-redux";
import { selectWaterDate } from "../../redux/water/selectors.js";
import { useTranslation } from "react-i18next";

const WaterModal = ({ isOpen, onClose, operationType, initialData }) => {
  const { t } = useTranslation();
  const title =
    operationType === "add" ? t("button.addWater") : t("waterModal.editWaterAmount");

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css.waterModal}>
        <h2 className={css.title}>{title}</h2>
        <WaterForm
          operationType={operationType}
          onClose={onClose}
          initialData={initialData}
        />
      </div>
    </BaseModal>
  );
};

export default WaterModal;
