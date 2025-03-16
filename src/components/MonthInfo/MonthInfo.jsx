import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaterMonth } from "../../redux/month/operations";
import {
  selectMonthWater,
  selectIsLoadingMonth,
  selectError,
} from "../../redux/month/selectors";
import Calendar from "../Calendar/Calendar";
import CalendarPagination from "../CalendarPagination/CalendarPagination";

// import css from "./MonthInfo.module.css";

const MonthInfo = ({ setDateForTitle }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const dispatch = useDispatch();
  const monthWater = useSelector(selectMonthWater);
  const loading = useSelector(selectIsLoadingMonth);
  const error = useSelector(selectError);

  useEffect(() => {
    const yearMonth = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}`;
    dispatch(getWaterMonth(yearMonth));
    console.log(yearMonth);

    console.log(monthWater);
  }, [dispatch, currentDate]);

  return (
    <div>
      <CalendarPagination
        currentDate={currentDate}
        onChangeMonth={setCurrentDate}
      />
      {loading && <p>Завантаження...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      console.log(perMonth);
      <Calendar
        setDateForTitle={setDateForTitle}
        currentDate={currentDate}
        waterData={monthWater}
        // onClick={onDayChange}
      />
    </div>
  );
};

export default MonthInfo;
