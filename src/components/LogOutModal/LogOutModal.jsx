import { useNavigate } from "react-router-dom";
import { BaseModal } from "../BaseModal/BaseModal";
import css from "./LogOutModal.module.css";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/user/operations";
import { useTranslation } from "react-i18next";
const LogOutModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = async () => {
    await dispatch(logOut);
    navigate("/");
  };
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <h3 className={css.header}>{t("userBarPopover.logOut")}</h3>
      <p className={css.logOutText}>{t("logoutModal.text")}</p>
      <div className={css.buttonCont}>
        <button className={css.logOutBut} onClick={handleClick}>
        {t("userBarPopover.logOut")}
        </button>
        <button className={css.closeBut} onClick={onClose}>
        {t("logoutModal.cancelButton")}
        </button>
      </div>
    </BaseModal>
  );
};
export default LogOutModal;
