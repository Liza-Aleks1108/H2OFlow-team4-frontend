import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";
import {
  selectError,
  selectLoading,
  selectMonth,
} from "../../redux/water/selectors.js";
import { selectUser } from "../../redux/user/selectors.js";
import { getWaterMonth } from "../../redux/water/operations.js";

const MonthInfo = ({ dailyNorma, setDateForTitle }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const waterMonth = useSelector(selectMonth);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dailyNorm = user?.dailyNorm / 1000 || 1.5;

  // Преобразование данных для месяца (с использованием useMemo)
  const formattedMonthData = useMemo(() => {
    return waterMonth.map((day) => {
      return {
        id: day.id,
        date: day.day.split("-")[2],  // Дата дня (день месяца)
        value: Math.floor(Number(day.totalAmount) * 1000), // Преобразование в литры (если данные в мл)
      };
    });
  }, [waterMonth]);

  // Группировка данных по дням
  const groupedData = useMemo(() => {
    return Array.from(
      formattedMonthData.reduce((map, { date, value }) => {
        map.set(date, (map.get(date) || 0) + value); // Суммируем объемы для каждого дня
        return map;
      }, new Map()),
      ([date, value]) => ({ day: date, volume: value })
    );
  }, [formattedMonthData]);

  const handleMonthChange = (newDate) => {
    setCurrentDate((prevDate) => {
      const prevYearMonth = `${prevDate.getFullYear()}-${String(
        prevDate.getMonth() + 1
      ).padStart(2, "0")}`;
      const newYearMonth = `${newDate.getFullYear()}-${String(
        newDate.getMonth() + 1
      ).padStart(2, "0")}`;

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
        waterData={groupedData}  // Используем сгруппированные данные
        dailyNorm={dailyNorm}
        setDateForTitle={setDateForTitle}
      />
    </div>
  );
};

export default MonthInfo;
