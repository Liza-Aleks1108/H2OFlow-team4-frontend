import css from "./BaseModal.module.css";
import Modal from "react-modal";

Modal.setAppElement("#root");

export const BaseModal = ({ isOpen, onClose, children }) => {
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      className={css.modal} 
      overlayClassName={css.overlay} 
    >
      <button type="button" className={css.close} onClick={onClose}>
        <svg className={css.svgClose} aria-label="Close modal">
          <use href={`${window.location.origin}/sprite.svg#icon-close`}></use>
        </svg>
      </button>
      {children}
    </Modal>
  );
};
