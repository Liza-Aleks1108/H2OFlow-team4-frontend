import React, { useState } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";
import WaterModal from "../../components/WaterModal/WaterModal.jsx";

const TrackerPage = () => {
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [operationType, setOperationType] = useState("add");

  // const openModal = (type) => {
  //   setOperationType(type);
  //   setModalOpen(true);
  // };

  return (
    <div className={css.trackerPageWrapper}>
      <WaterMainInfo />
      <WaterDetailedInfo />
      <WaterModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        operationType={operationType}
      />
    </div>
  );
};

export default TrackerPage;
