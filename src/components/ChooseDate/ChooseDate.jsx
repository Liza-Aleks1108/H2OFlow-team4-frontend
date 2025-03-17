import { useTranslation } from "react-i18next";
import css from "./ChooseDate.module.css";

const ChooseDate = ({ selectedDate }) => {
  const { t, i18n } = useTranslation();

  const formatDate = (date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return t("Today");
    }
    const title = date.toLocaleDateString(i18n.language, {
      month: "long",
      day: "numeric",
    });

    if (i18n.language === "uk") {
      return title;
    }
    // console.log(title);

    const day = title.slice(title.length - 2);
    const month = title.slice(0, title.length - 2);

    return `${day} ${month}`;
  };

  return (
    <div>
      <h3 className={css.daily_info}>{formatDate(selectedDate)}</h3>
    </div>
  );
};

export default ChooseDate;
