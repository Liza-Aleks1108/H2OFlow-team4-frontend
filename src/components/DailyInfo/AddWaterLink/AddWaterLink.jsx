import { useState } from "react";
import { BaseModal } from "../../BaseModal/BaseModal.jsx";
import WaterForm from "../../WaterForm/WaterForm.jsx";
import css from "./AddWaterLink.module.css";

const AddWaterLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className={css.btn}>
        <div className={css.wrapper}>
          <svg width="30" height="30" className={css.icon}>
            <use href={`#icon-plus-bl`} />
          </svg>
          <p>Add water</p>
        </div>
      </button>

      {isModalOpen && (
        <BaseModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className={css.waterModal}>
            <h2 className={css.title}>Add water</h2>
            <WaterForm onClose={handleCloseModal} operationType="add" />
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default AddWaterLink;
