import React from "react";
import style from "./AddWaterBtn.module.css";

const AddWaterBtn = ({ onClick }) => {
  return (
    <div className={style.container}>
      <button onClick={onClick} className={style.btn}>
        <svg className={style.iconPlus}>
          <use xlinkHref="/sprite.svg#icon-plus"></use>
        </svg>
        <p className={style.btnText}>Add water</p>
      </button>
    </div>
  );
};

export default AddWaterBtn;
