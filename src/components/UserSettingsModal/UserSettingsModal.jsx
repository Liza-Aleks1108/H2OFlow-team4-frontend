import { ToastContainer } from "react-toastify";
import { BaseModal } from "../BaseModal/BaseModal.jsx";
import UserSettingsForm from "../UserSettingsForm/UserSettingsForm.jsx";
import s from "./UserSettingsModal.module.css";
import { useTranslation } from "react-i18next";

const UserSettingsModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation(); 
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={s.userSetWrap}>
        <h2>{t("userBarPopover.setting")}</h2>
        <UserSettingsForm onClose={onClose} />
      </div>
      <ToastContainer />
    </BaseModal>
  );
};

export default UserSettingsModal;
