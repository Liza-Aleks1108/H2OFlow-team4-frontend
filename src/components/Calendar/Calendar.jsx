import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveDate } from "../../redux/water/selectors.js";

import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";

const Calendar = ({ currentDate, waterData, dailyNorm, setDateForTitle }) => {
  const dispatch = useDispatch();
  const [days, setDays] = useState([]);
  const selectDay = new Date(useSelector(selectActiveDate) || new Date());
  const [selectedDate, setSelectedDate] = useState(selectDay || new Date());

  useEffect(() => {
    if (!selectedDate) {
      const today = new Date();
      console.log("🚀 Встановлюємо поточну дату:", today);
      setSelectedDate(today);
    }
  }, [selectedDate, setSelectedDate]);

  // useEffect(() => {
  //   if (!selectedDate) {
  //     setSelectedDate(new Date()); // Встановлюємо поточну дату при відкритті сторінки
  //   }
  // }, [selectedDate]);

  // useEffect(() => {
  //   if (!selectedDate) {
  //     const today = new Date();
  //     console.log("🚀 Встановлюємо поточну дату:", today);
  //     setSelectedDate(today);
  //   }
  // }, [selectedDate, setSelectedDate]);

  // Вычисление процентов воды
  const arrPercent = waterData.map((item) => ({
    ...item,
    percent: dailyNorm
      ? ((item.volume / 1000 / dailyNorm) * 100).toFixed(0)
      : 0,
  }));

  // Эффект для обновления даты в заголовке
  useEffect(() => {
    setDateForTitle(selectedDate);
  }, [selectedDate, setDateForTitle]);

  // Эффект для генерации календаря
  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
    setDays(Array.from({ length: lastDay }, (_, i) => i + 1));
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();

    if (clickedDate > today) return;

    const formattedDate = clickedDate.toISOString();
    dispatch({ type: "water/updateActiveDate", payload: formattedDate });

    setSelectedDate(clickedDate);
  };

  const getPercent = (day) => {
    const dayPrcent = arrPercent.find((item) => item.day === day);
    return dayPrcent ? dayPrcent.percent : 0;
  };

  return (
    <div className={css.container}>
      <div className={css.grid}>
        {days.map((day) => {
          const dateKey = `${currentDate.getFullYear()}-${String(
            currentDate.getMonth() + 1
          ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isToday =
            new Date().toDateString() ===
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            ).toDateString();
          const isSelected =
            selectedDate.toDateString() ===
            new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              day
            ).toDateString();
          const percent = getPercent(dateKey);

          return (
            <CalendarItem
              key={day}
              day={day}
              dateKey={dateKey}
              waterPercent={percent}
              isToday={isToday}
              isSelected={isSelected}
              onClick={() => handleDateClick(day)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
