import React from "react";
import WaterMainInfo from "../../components/WaterMainInfo/WaterMainInfo";
import WaterDetailedInfo from "../../components/WaterDetailedInfo/WaterDetailedInfo";
import css from "./TrackerPage.module.css";

const TrackerPage = () => {
  return (
    <div className={css.trackerPageWrapper}>
      {/* <h1>Трекер води</h1> */}
      <WaterMainInfo />
      <WaterDetailedInfo />
    </div>
  );
};

export default TrackerPage;
