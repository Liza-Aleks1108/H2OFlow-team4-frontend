import React from "react";
import { useState, useEffect, useMemo, useCallback } from "react";
import ChooseDate from "../ChooseDate/ChooseDate";
import WaterList from "../WaterList/WaterList";
import styles from "./DailyInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getWaterPerDay } from "../../redux/filters/operations";
import { selectDayWater } from "../../redux/filters/selectors";
import AddWaterLink from "./AddWaterLink/AddWaterLink";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DailyInfo = ({ chosenDate, dateForTitle }) => {
  const dispatch = useDispatch();
  // const todayWater = useSelector(selectDayWater);
  const todayWater = [
    { id: 1, amount: 250, time: "07:00" },
    { id: 2, amount: 250, time: "11:00" },
    { id: 3, amount: 250, time: "14:00" },
  ];
  const [isCurrentDay, setIsCurrentDay] = useState("");

  const formattedDate = useMemo(
    () => formatDate(dateForTitle || new Date()),
    [dateForTitle]
  );

  const handleDeleteWater = useCallback(
    async (id) => {
      await dispatch(deleteWater(id));
      dispatch(getDayWater(formattedDate));
      dispatch(getMonthWater(formattedDate.slice(0, -3)));
    },
    [dispatch, formattedDate]
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
        <ChooseDate selectedDate={dateForTitle || new Date()} />
        <AddWaterLink />
      </div>{" "}
      <div className={styles.waterListWrapper}>
        {todayWater.length > 0 ? (
          <WaterList
            waterData={todayWater}
            onDelete={handleDeleteWater}
            dateForCalendar={chosenDate}
          />
        ) : (
          <div className={styles.text}>
            <p className={styles.waterEmpty}>
              You haven't drunk water yet, maybe it's time to drink?
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default DailyInfo;
