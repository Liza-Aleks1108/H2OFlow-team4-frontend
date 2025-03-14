import css from "./DeleteWaterModal.module.css";
import { BaseModal } from "../BaseModal/BaseModal";

// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";

const DeleteWaterModal = ({ handleDelete, modalIsOpen, closeModal }) => {
  // const dispatch = useDispatch();
  // const onDelete = async () => {
  //   try {
  //     await dispatch(deleteWater(water._id)).unwrap();
  //     dispatch(updateWaterData());
  //     toast.success(
  //       "The amount of water consumed has been successfully deleted."
  //     );
  //     onRequestClose();
  //   } catch (error) {
  //     toast.error(error.message || "Something went wrong. Please try again.");
  //   }
  // };
  return (
    <BaseModal isOpen={modalIsOpen} onClose={closeModal}>
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
          <button type="button" className={css.cancelBtn} onClick={closeModal}>
            Cancel
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default DeleteWaterModal;
