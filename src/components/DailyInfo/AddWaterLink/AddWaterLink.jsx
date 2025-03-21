import { useState } from "react";
import WaterModal from "../../WaterModal/WaterModal";
import css from "./AddWaterLink.module.css";
import sprite from "../../../../public/sprite.svg";
import { useTranslation } from "react-i18next";

const AddWaterLink = () => {
  const { t } = useTranslation();
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
          <div className={css["icon-container"]}>
            <svg width="20" height="20" className={css.icon}>
              <use href={`${sprite}#icon-plus-bl`} />
            </svg>
          </div>
          <p>{t("button.addWater")}</p>
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
