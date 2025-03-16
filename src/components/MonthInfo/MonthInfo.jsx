import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getWaterMonth } from "../../redux/month/operations";
import {
  selectMonthWater,
  selectIsLoadingMonth,
  selectError,
} from "../../redux/month/selectors";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";

const MonthInfo = () => {
// import css from "./MonthInfo.module.css";
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  const loading = useSelector(selectIsLoadingMonth);
  const error = useSelector(selectError);

  // Використовуємо shallowEqual, щоб запобігти зайвим ререндерам
  const monthWater = useSelector(selectMonthWater, shallowEqual);

  const totalWater = 1500; // ✅ Отримуємо норму води (можна з Redux)

  // ✅ Розраховуємо відсотки ТІЛЬКИ коли оновлюється monthWater
  // const percentArray = useMemo(() => {
  //   console.log("📊 Перераховуємо percentArray...");
  //   return calculateWaterPercentage(monthWater, totalWater);
  // }, [monthWater, totalWater]);

  // 🛑 Перевіряємо, коли monthWater реально змінюється
  useEffect(() => {
    console.log("📦 Дані Redux змінилися:", monthWater);
  }, [monthWater]);

  // ✅ Фіксуємо, щоб setCurrentDate() не викликав зайві ререндери
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
        console.log("📅 Оновлюємо currentDate:", newYearMonth);
        return newDate;
      }
      return prevDate;
    });
  };

  // ✅ Запит лише при зміні місяця (без зайвих викликів)
  useEffect(() => {
    const yearMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;

    console.log("📅 Викликаємо getWaterMonth:", yearMonth);
    dispatch(getWaterMonth(yearMonth));
  }, [dispatch, currentDate]);
  // waterData = { percentArray };

  return (
    <div>
      <CalendarPagination
        currentDate={currentDate}
        onChangeMonth={handleMonthChange} // ✅ Використовуємо захищену функцію
      />
      {loading && <p>⏳ Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Calendar currentDate={currentDate} />
    </div>
  );
};

export default MonthInfo;
