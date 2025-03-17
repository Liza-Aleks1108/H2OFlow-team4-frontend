import { useEffect, useState } from "react";
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

const MonthInfo = (dailyNorma) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const waterMonth = useSelector(selectMonth);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dailyNorm = user?.dailyNorm / 1000 || 1.5;

  // console.log(waterMonth);

  const groupedData = Array.from(
    waterMonth.reduce((map, { day, volume }) => {
      const numericVolume = Number(volume) || 0;
      map.set(day, (map.get(day) || 0) + numericVolume);
      return map;
    }, new Map()),
    ([day, volume]) => ({ day, volume })
  );

  // console.log(groupedData);

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
        waterData={groupedData}
        dailyNorm={dailyNorm}
      />
    </div>
  );
};

export default MonthInfo;
