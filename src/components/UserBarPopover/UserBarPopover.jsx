import { useState } from "react";
import LogOutModal from "../LogOutModal/LogOutModal";
import css from "./UserBarPopover.module.css";
import UserSettingsModal from "../UserSettingsModal/UserSettingsModal.jsx";
import { useTranslation } from "react-i18next";

const UserBarPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { t } = useTranslation();
  const handleClick = (e) => {
    setIsOpen(true);
  };
  return (
    <div className={css.userBarPopover}>
      <button className={css.setBut} onClick={() => setIsSettingsOpen(true)}>
        <svg className={css.svg}>
          <use href="/sprite.svg#icon-settings" className={css.svgUseSet}></use>
        </svg>
        {t("userBarPopover.setting")}
      </button>
      <button className={css.logBut} onClick={handleClick}>
        <svg className={css.svg}>
          <use href="/sprite.svg#icon-log-out" className={css.svgUseLog}></use>
        </svg>
        {t("userBarPopover.logOut")}
      </button>
      <LogOutModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <UserSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => {
          setIsSettingsOpen(false);
        }}
      />
    </div>
  );
};
export default UserBarPopover;
