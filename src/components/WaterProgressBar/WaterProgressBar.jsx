import React from "react";
import style from "./WaterProgressBar.module.css";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectActiveDate, selectDay } from "../../redux/water/selectors.js";
import { selectUser } from "../../redux/user/selectors.js";

const WaterProgressBar = () => {
  const { t, i18n } = useTranslation();
  const currentMoment = useSelector(selectDay);
  const dailyAmount = useSelector(selectUser);
  const selectedDay = useSelector(selectActiveDate);

  const isToday = (someDay) => {
    const today = new Date();
    return (
      someDay.getDate() === today.getDate() &&
      someDay.getMonth() === today.getMonth() &&
      someDay.getFullYear() === today.getFullYear()
    );
  };

  const formatDate = (date) => {
    const dateObject = new Date(date);
    if (isToday(dateObject)) {
      return t("waterDailyNorma.textH3");
    } else {
      const day = dateObject.getDate();
      const month = dateObject
        .toLocaleString(i18n.language, { month: "long" })
        .toLowerCase();
      return `${day}, ${month}`;
    }
  };

  const amountPerDay = currentMoment.reduce(
    (sum, item) => sum + Number(item.volume),
    0
  );

  let progress = (amountPerDay * 100) / dailyAmount.dailyNorm;
  progress = Math.min(progress, 100);

  return (
    <div className={style.container}>
      <h3 className={style.textH3}>{formatDate(selectedDay)}</h3>
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
            className={style.scaleMoveText}
            style={{
              left: `${progress}%`,
              transform: "translateX(-50%)",
            }}
          >
            {Math.round(progress)}%
          </div>

          <div
            className={style.scaleText}
            style={{
              left: "0",
            }}
          >
            0%
          </div>
          <div
            className={style.scaleText}
            style={{
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            50%
          </div>
          <div
            className={style.scaleText}
            style={{
              right: "0",
            }}
          >
            100%
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterProgressBar;
