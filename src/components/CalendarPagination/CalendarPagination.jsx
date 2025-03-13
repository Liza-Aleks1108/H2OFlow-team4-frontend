import React from "react";
import css from "./CalendarPagination.module.css";

const CalendarPagination = ({ currentDate, onChangeMonth }) => {
  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    onChangeMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    onChangeMonth(nextMonth);
  };
  //   console.log(currentDate);

  return (
    <div className={css.pagination}>
      <h2 className={css.headerMonth}>Month</h2>
      <div className={css.paginationBox}>
        <button className={css.arrow} onClick={handlePrevMonth}>
          <svg className={css.icon}>
            <use href="/sprite.svg#chevron-left"></use>
          </svg>
        </button>
        <span className={css.currentMonth}>
          {/* {currentDate.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        })} */}
          {`${new Intl.DateTimeFormat("en-US", { month: "long" }).format(
            currentDate
          )}, ${currentDate.getFullYear()}`}
        </span>
        <button className={css.arrow} onClick={handleNextMonth}>
          <svg className={css.icon}>
            <use href="/sprite.svg#chevron-right"></use>
          </svg>
        </button>
      </div>
      <button className={css.chhart}>
        <svg className={css.icon_chart}>
          <use href="/sprite.svg#icon-pie-chart"></use>
        </svg>
      </button>
      {/* </div> */}
    </div>
  );
};

export default CalendarPagination;
