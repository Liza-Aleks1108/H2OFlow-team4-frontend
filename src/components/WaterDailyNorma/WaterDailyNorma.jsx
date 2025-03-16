import React from "react";
import style from "./WaterDailyNorma.module.css";
import { useTranslation } from "react-i18next";

const WaterDailyNorma = ({ dailyNorm }) => {
  const { t } = useTranslation(); 
  return (
    <div className={style.normContainer}>
      <h3 className={style.textH3}>{dailyNorm}{t("waterDailyNorma.l")}</h3>
      <p className={style.textDailyNorm}>{t("waterDailyNorma.textDailyNorm")}</p>
    </div>
  );
};

export default WaterDailyNorma;
