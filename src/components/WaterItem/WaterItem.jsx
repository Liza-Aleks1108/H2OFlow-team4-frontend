import React, { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import styles from "./WaterItem.module.css";

const WaterItem = ({ data, onDelete }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = () => {
    console.log(`Видаляємо запис води з id: ${data.id}`);
    onDelete(data.id); // Видаляємо елемент без анімації "зникнення"
    setIsDeleteOpen(false); // Закриваємо модалку після видалення
  };

  return (
    <div className={styles.waterItem}>
      <div className={styles.icon}>
        <svg className={styles.waterGlass}>
          <use href="/sprite.svg#icon-water-glass-fill"></use>
        </svg>
      </div>
      <div className={styles.info}>
        <p className={styles.amount}>{data.amount} ml</p>
        <p className={styles.time}>{formattedTime}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setIsEditOpen(true)}>
          <svg className={styles.editIcon}>
            <use href="/sprite.svg#icon-Vector-pen"></use>
          </svg>
        </button>
        <button onClick={handleOpenModel}>
          <svg className={styles.deleteIcon}>
            <use href="/sprite.svg#icon-trash-04"></use>
          </svg>
        </button>
      </div>
      <WaterModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <DeleteWaterModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default WaterItem;
