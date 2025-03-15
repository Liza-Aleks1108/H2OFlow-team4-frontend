import css from "./CalendarItem.module.css";

const CalendarItem = ({
  day,
  dateKey,
  waterData,
  isToday,
  isSelected,
  onClick,
}) => {
  const waterPercent = waterData?.[dateKey] || 0;
  let dayClass = css.day;
  const today = new Date();

  if (isSelected) {
    dayClass = `${css.day} ${css.selected}`;
  } else if (isToday) {
    dayClass = `${css.day} ${css.today}`;
  }

  dayClass = `${dayClass} 
          ${waterPercent >= 100 ? css.fullWater : css.partialWater}
          ${onClick > today ? css.forbidden : ""}`;

  return (
    <div>
      <div className={dayClass} onClick={onClick}>
        <span className={isSelected ? css.selectedText : ""}>{day}</span>
      </div>
      <div className={css.waterPercent}>{waterPercent}%</div>
    </div>
  );
};

export default CalendarItem;
