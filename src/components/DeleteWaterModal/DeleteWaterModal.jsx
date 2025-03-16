import css from "./DeleteWaterModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";

const DeleteWaterModal = ({ isOpen, onClose, handleDelete }) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div className={css.deleteModal}>
        <h2 className={css.modalDeleteTitle}>Delete Water Entry</h2>
        <p className={css.modalDeleteText}>
          Are you sure you want to delete this entry?
        </p>
        <div className={css.box}>
          <button
            type="button"
            className={css.deleteBtn}
            onClick={handleDelete}
          >
            Delete
          </button>
          <button type="button" className={css.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteWaterModal;
