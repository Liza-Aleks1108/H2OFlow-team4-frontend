import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors.js";
import style from "./WaterDailyNorma.module.css";
import { useTranslation } from "react-i18next";

const WaterDailyNorma = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);
  const dailyNorm = user?.dailyNorm / 1000 || 1.5;

  return (
    <div className={style.normContainer}>
      <h3 className={style.textH3}>
        {dailyNorm}
        {t("waterDailyNorma.l")}
      </h3>
      <p className={style.textDailyNorm}>
        {t("waterDailyNorma.textDailyNorm")}
      </p>
    </div>
  );
};

export default WaterDailyNorma;
