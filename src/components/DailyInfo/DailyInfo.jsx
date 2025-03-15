import React from "react";
import { useState, useEffect, useMemo } from "react";
import ChooseDate from "../ChooseDate/ChooseDate";
import WaterList from "../WaterList/WaterList";
import styles from "./DailyInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getWaterPerDay } from "../../redux/filters/operations";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DailyInfo = ({ chosenDate }) => {
  const dispatch = useDispatch();
  const [isCurrentDay, setIsCurrentDay] = useState("");

  const formattedDate = useMemo(
    () => formatDate(chosenDate || new Date()),
    [chosenDate]
  );

  useEffect(() => {
    if (formattedDate !== isCurrentDay) {
      setIsCurrentDay(formattedDate);
      dispatch(getWaterPerDay(formattedDate));
    }
  }, [dispatch, formattedDate, isCurrentDay]);

  return (
    <section className={styles.dailyInfo}>
      <div className={styles.wrapper}>
        <h3 className={styles.today}>Today</h3>
      </div>{" "}
      <WaterList />
      <ChooseDate />
    </section>
  );
};

export default DailyInfo;
