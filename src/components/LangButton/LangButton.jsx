import { useTranslation } from "react-i18next";
import s from "./LangButton.module.css";
import { useState } from "react";

const LangButton = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };
  

  return (
    <div className={s.langSwitcher}>
      <button className={s.langBtn} onClick={toggleMenu}>
        🌐{i18n.language === "uk" ? "UA" : "EN"} ▼
      </button>

      {isOpen && (
        <div className={s.dropdownMenu}>
          <button
            className={s.dropdownItem}
            onClick={() => changeLanguage("en")}
          >
            English
          </button>
          <button
            className={s.dropdownItem}
            onClick={() => changeLanguage("uk")}
          >
            Українська
          </button>
        </div>
      )}
    </div>
  );
};

export default LangButton;
