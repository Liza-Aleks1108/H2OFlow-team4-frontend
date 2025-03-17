import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateActiveDate } from "../../redux/water/slice"; // Подключаем экшен из слайса
import { selectActiveDate } from "../../redux/water/selectors";
import CalendarItem from "../CalendarItem/CalendarItem";
import css from "./Calendar.module.css";

const Calendar = ({ currentDate, waterData }) => {
  const dispatch = useDispatch();
  const [days, setDays] = useState([]);
  const activeDate = useSelector(selectActiveDate); // Изменяем на правильный селектор
  const [selectedDate, setSelectedDate] = useState(
    activeDate ? new Date(activeDate) : new Date()
  );

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

    if (clickedDate > today) return; // Не даём выбрать будущую дату

    const formattedDate = clickedDate.toISOString().split("T")[0]; // Преобразуем дату в строку без времени
    dispatch(updateActiveDate(formattedDate)); // Отправляем обновлённую дату в Redux

    setSelectedDate(clickedDate); // Обновляем локальное состояние
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
