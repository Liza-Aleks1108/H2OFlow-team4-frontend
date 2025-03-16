import { useState } from "react";
import WaterModal from "../../WaterModal/WaterModal";
import css from "./AddWaterLink.module.css";
import sprite from "../../../../public/sprite.svg";

const AddWaterLink = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <button onClick={handleOpenModal} className={css.btn}>
        <div className={css.wrapper}>
          <svg width="30" height="30" className={css.icon}>
            <use href={`${sprite}#icon-plus-bl`} />
          </svg>
          <p>Add water</p>
        </div>
      </button>

      {isModalOpen && (
        <WaterModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          operationType="add"
        />
      )}
    </div>
  );
};

export default AddWaterLink;
