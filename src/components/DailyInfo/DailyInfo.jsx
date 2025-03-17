import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import ChooseDate from "../ChooseDate/ChooseDate";
import WaterList from "../WaterList/WaterList";
import styles from "./DailyInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import AddWaterLink from "./AddWaterLink/AddWaterLink";
import { getWaterPerDay } from "../../redux/water/operations.js";
import { selectDay } from "../../redux/water/selectors.js";
import { useTranslation } from "react-i18next";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DailyInfo = ({ dateForTitle }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const todayWater = useSelector(selectDay);
  console.log("todayWater", todayWater);

  const formattedDate = useMemo(
    () => formatDate(dateForTitle || new Date()),
    [dateForTitle]
  );

  useEffect(() => {
    dispatch(getWaterPerDay(formattedDate));
  }, [dispatch, formattedDate, todayWater.length]);

  return (
    <section className={styles.dailyInfo}>
      <div className={styles.wrapper}>
        <ChooseDate selectedDate={dateForTitle || new Date()} />
        <AddWaterLink />
      </div>
      <div className={styles.waterListWrapper}>
        {todayWater.length > 0 ? (
          <WaterList waterData={todayWater} formattedDate={formattedDate} />
        ) : (
          <div className={styles.text}>
            <p className={styles.waterEmpty}>
              {t("dailyInfo.noWater")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyInfo;
