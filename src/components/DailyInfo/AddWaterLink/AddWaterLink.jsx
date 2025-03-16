import css from "./AddWaterLink.module.css";
import sprite from "../../../../public/sprite.svg";

const AddWaterLink = ({ onClick }) => {
  const handleAddWaterClick = () => {
    if (onClick) {
      onClick();
    }
  };
  return (
    <button onClick={onClick} className={css.btn}>
      <div className={css.wrapper}>
        <svg width="30" height="30" className={css.icon}>
          <use href={`${sprite}#icon-plus-bl`} />
        </svg>
        <p> Add water</p>
      </div>
    </button>
  );
};

export default AddWaterLink;
