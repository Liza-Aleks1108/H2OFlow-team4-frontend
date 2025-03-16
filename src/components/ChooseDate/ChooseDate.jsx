import css from "./ChooseDate.module.css";

const ChooseDate = ({ chosenDate }) => {
  return (
    <div>
      <h3 className={css.daily_info}>{chosenDate}</h3>
    </div>
  );
};

export default ChooseDate;
