import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors.js";
import style from "./WaterDailyNorma.module.css";

const WaterDailyNorma = () => {
  const user = useSelector(selectUser);
  const dailyNorm = user?.dailyNorm / 1000 || 1.5;

  return (
    <div className={style.normContainer}>
      <h3 className={style.textH3}>{dailyNorm} L</h3>
      <p className={style.textDailyNorm}>My daily norma</p>
    </div>
  );
};

export default WaterDailyNorma;
