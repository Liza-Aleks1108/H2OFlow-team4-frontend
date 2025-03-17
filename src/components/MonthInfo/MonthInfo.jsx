import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import {
  selectError,
  selectLoading,
  selectMonth,
} from "../../redux/water/selectors.js";
import { getWaterMonth } from "../../redux/water/operations.js";

const MonthInfo = ({ dailyNorma, setDateForTitle }) => {
  // import css from "./MonthInfo.module.css";
  const [currentDate, setCurrentDate] = useState(new Date());
  const waterMonth = useSelector(selectMonth);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const formatMonth = useMemo(() => {
    console.log("WWW");

    return waterMonth.map((day) => {
      return {
        id: day.id,
        date: day.day.split("-")[2],
        value: Math.floor(Number(day.totalAmount) * 1000),
      };
    });
  }, [waterMonth]);

  console.log(formatMonth);

  const handleMonthChange = (newDate) => {
    setCurrentDate((prevDate) => {
      const prevYearMonth = `${prevDate.getFullYear()}-${String(
        prevDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const newYearMonth = `${newDate.getFullYear()}-${String(
        newDate.getMonth() + 1
      ).padStart(2, "0")}`;

      // 🔥 Перевіряємо, чи змінилась дата, щоб не робити зайвий запит
      if (prevYearMonth !== newYearMonth) {
        return newDate;
      }
      return prevDate;
    });
  };

  useEffect(() => {
    const yearMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    dispatch(getWaterMonth(yearMonth));
  }, [dispatch, currentDate, dailyNorma]);

  return (
    <div>
      <CalendarPagination
        currentDate={currentDate}
        onChangeMonth={handleMonthChange}
      />
      {loading && <p>⏳ Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Calendar
        currentDate={currentDate}
        waterData={waterMonth}
        setDateForTitle={setDateForTitle}
      />
    </div>
  );
};

export default MonthInfo;
