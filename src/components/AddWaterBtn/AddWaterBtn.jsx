import React from "react";
import style from "./AddWaterBtn.module.css";
import { useTranslation } from "react-i18next";

const AddWaterBtn = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <div className={style.container}>
      <button onClick={onClick} className={style.btn}>
        <svg className={style.iconPlus}>
          <use xlinkHref="/sprite.svg#icon-plus"></use>
        </svg>
        <p className={style.btnText}>{t("button.addWater")}</p>
      </button>
    </div>
  );
};

export default AddWaterBtn;
