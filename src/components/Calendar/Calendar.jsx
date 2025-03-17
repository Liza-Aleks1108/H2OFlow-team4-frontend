import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { updateActiveDate } from "../../redux/water/slice.js";
import { selectActiveDate } from "../../redux/water/selectors.js";

import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";
// import { selectMonth } from "../../redux/water/selectors.js";
// , onDateSelect

const Calendar = ({ currentDate, waterData }) => {
  const dispatch = useDispatch();
  const [days, setDays] = useState([]);
  const selectDay = useSelector(selectActiveDate);
  const [selectedDate, setSelectedDate] = useState(
    selectDay ? selectDay : new Date()
  );
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

    const formattedDate = clickedDate.toISOString(); // Преобразуем в строку. Храниться в особом формате, онтосительно нашего часового пояса
    dispatch({ type: "water/updateActiveDate", payload: formattedDate }); // записуємо вибрану дату в Store для DailyInfo

    //для чтения обратно из сторе
    // const storedDate = state.activeDate; // Дата из Redux
    // const activeDate = new Date(storedDate); // Преобразуем обратно

    setSelectedDate(clickedDate);
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
