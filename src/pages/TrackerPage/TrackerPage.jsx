import React, { useState } from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";

const TrackerPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [operationType, setOperationType] = useState("add");

  const openModal = (type) => {
    setOperationType(type);
    setModalOpen(true);
  };
  return (
    <div className={css.trackerPageWrapper}>
      {/* <div className={css.trackerPage}> */}
      <WaterMainInfo />
      <WaterDetailedInfo />
      {/* </div> */}
    </div>
  );
};

export default TrackerPage;
