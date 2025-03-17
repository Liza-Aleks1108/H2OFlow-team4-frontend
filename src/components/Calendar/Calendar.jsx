import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";

import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";
import { selectMonth } from "../../redux/water/selectors.js";
// , onDateSelect

const Calendar = ({ currentDate, waterData }) => {
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  // const monthWater = useSelector(selectMonth);

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

    setSelectedDate(clickedDate);
    // onDateSelect(clickedDate); // Передаємо вибрану дату в DailyInfo
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

          return (
            <CalendarItem
              key={day}
              day={day}
              dateKey={dateKey}
              // waterData={waterData}
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
