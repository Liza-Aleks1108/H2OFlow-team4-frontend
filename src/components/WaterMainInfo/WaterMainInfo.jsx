import React, { useState } from "react";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterModal from "../WaterModal/WaterModal";
import css from "./WaterMainInfo.module.css";

const WaterMainInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dailyNorm = 1.5;
  const consumed = 0.7;

  const handleAddWaterClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <WaterDailyNorma dailyNorm={dailyNorm} />
      <WaterProgressBar consumed={consumed} dailyNorm={dailyNorm} />
      <AddWaterBtn onClick={handleAddWaterClick} />
      {isModalOpen && <WaterModal onClose={handleCloseModal} />}
    </div>
  );
};

export default WaterMainInfo;
