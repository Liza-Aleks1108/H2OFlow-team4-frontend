import React from "react";
import style from "./WaterProgressBar.module.css";
import { useTranslation } from "react-i18next";

const WaterProgressBar = ({ consumed, dailyNorm }) => {
  const { t } = useTranslation(); 
  const progress = (consumed / dailyNorm) * 100;

  return (
    <div className={style.container}>
      <h3 className={style.textH3}>{t("waterDailyNorma.textH3")}</h3>
      <div className={style.scaleContainer}>
        <div className={style.emptyScale}>
          <div
            className={style.progressScale}
            style={{
              width: `${progress}%`,
            }}
          ></div>
          <div
            className={style.scaleCircle}
            style={{
              left: `${progress}%`,
            }}
          ></div>

          <div
            className={style.scaleText}
            style={{
              left: `${progress}%`,
              transform: "translateX(-50%)",
            }}
          >
            {Math.round(progress)}%
          </div>
          {progress >= 10 && (
            <div
              className={style.scaleText}
              style={{
                left: "0",
              }}
            >
              0%
            </div>
          )}
          {progress <= 90 && (
            <div
              className={style.scaleText}
              style={{
                right: "0",
              }}
            >
              100%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
