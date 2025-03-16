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
      day: "numeric",
      month: "long",
    });

    const day = title.slice(title.length - 2);
    const month = title.slice(0, title.length - 3);

    return `${day}, ${month}`;
  };

  return (
    <div>
      <h3 className={css.daily_info}>{formatDate(selectedDate)}</h3>
    </div>
  );
};

export default ChooseDate;
