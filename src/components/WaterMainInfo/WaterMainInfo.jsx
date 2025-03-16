import React, { useState } from "react";
import WaterDailyNorma from "../WaterDailyNorma/WaterDailyNorma";
import WaterProgressBar from "../WaterProgressBar/WaterProgressBar";
import AddWaterBtn from "../AddWaterBtn/AddWaterBtn";
import WaterModal from "../WaterModal/WaterModal";
import Logo from "../Logo/Logo.jsx";
import css from "./WaterMainInfo.module.css";
import Logo from "../Logo/Logo";

const WaterMainInfo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationType, setOperationType] = useState("add");
  const dailyNorm = 1.5;
  const consumed = 0.8;

  const openModal = (type) => {
    if (!isModalOpen) {
      setOperationType(type);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={css.sectionWrapper}>
      <div className={css.wrapper}>
        <div className={css.logo}>
          <Logo />
        </div>
        <WaterDailyNorma dailyNorm={dailyNorm} />
        <WaterProgressBar consumed={consumed} dailyNorm={dailyNorm} />
        <AddWaterBtn onClick={() => openModal("add")} />

        <WaterModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          operationType={operationType}
        />
      </div>
    </section>
  );
};

export default WaterMainInfo;
