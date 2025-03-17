import UserBar from "../UserBar/UserBar.jsx";
import css from "./UserPanel.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors.js";
import { useTranslation } from "react-i18next";
const UserPanel = () => {
  const { t } = useTranslation();
  const user = useSelector(selectUser);

  return (
    <div className={css.userPanelCont}>
      <h2 className={css.helloUser}>
        {t("userPanel.hello")}
        <span className={css.helloUserSpan}>
          , {user.name ? user.name : "User"}!
        </span>
      </h2>
      <UserBar />
    </div>
  );
};
export default UserPanel;
