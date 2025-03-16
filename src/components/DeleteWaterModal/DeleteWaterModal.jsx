import css from "./DeleteWaterModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";
import { useTranslation } from "react-i18next";

const DeleteWaterModal = ({ isOpen, onClose, handleDelete }) => {
  const { t } = useTranslation();
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css.deleteModal}>
        <h2 className={css.modalDeleteTitle}>{t("deleteWaterModal.deleteWaterTitle")}</h2>
        <p className={css.modalDeleteText}>
          {t("deleteWaterModal.deleteWaterText")}
        </p>
        <div className={css.box}>
          <button
            type="button"
            className={css.deleteBtn}
            onClick={handleDelete}
          >
            {t("button.delete")}
          </button>
          <button type="button" className={css.cancelBtn} onClick={onClose}>
          {t("button.cancel")}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteWaterModal;
