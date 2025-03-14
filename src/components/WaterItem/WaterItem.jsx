import React, { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import styles from "./WaterItem.module.css";

const WaterItem = ({ id, data, onDelete, dateForCalendar }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const formattedTime = new Date(dateForCalendar).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCloseDeleteModal = () => setIsDeleteOpen(false);

  const handleOpenModel = () => setIsDeleteOpen(true);

  const handleDelete = () => {
    onDelete(id);
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
      {isEditOpen && <WaterModal onClose={() => setIsEditOpen(false)} />}
      {isDeleteOpen && (
        <DeleteWaterModal
          handleDelete={handleDelete}
          modalIsOpen={isDeleteOpen}
          closeModal={handleCloseDeleteModal}
        />
      )}
    </div>
  );
};

export default WaterItem;
