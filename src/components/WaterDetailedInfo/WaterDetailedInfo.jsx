import React, { useState } from "react";
import UserPanel from "../UserPanel/UserPanel";
import MonthInfo from "../MonthInfo/MonthInfo";
import css from "./WaterDetailedInfo.module.css";
// import LogOutModal from "../LogOutModal/LogOutModal";
import DailyInfo from "../DailyInfo/DailyInfo.jsx";

const WaterDetailedInfo = () => {
  const [dateForTitle, setDateForTitle] = useState();
  console.log(dateForTitle);
  // антону:
  // в цьому компоненті я так розумію потрібнно пов'язати дейлі інфо і календар. потрібно реалізувати логіку вибору дати
  // і передавати її у обидва компоненти. Я поки передаю поточний день
  return (
    <section className={css.sectionWrapper}>
      <div className={css.wrapper}>
        <UserPanel />
        <DailyInfo pickTheDay={new Date()} dateForTitle={dateForTitle} />
        <MonthInfo setDateForTitle={setDateForTitle} />
      </div>
    </section>
  );
};

export default WaterDetailedInfo;
