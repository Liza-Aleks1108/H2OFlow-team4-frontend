import React, { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import styles from "./WaterItem.module.css";

const WaterItem = ({ key, data, onDelete, dateForCalendar }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const formattedTime = new Date(item.drinkingTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleCloseDeleteModal = () => setIsDeleteOpen(false);

  const handleOpenModel = () => setIsDeleteOpen(true);

  const handleDelete = () => {
    onDelete(key);
  };

  return (
    <div className={styles.waterItem}>
      <div className={styles.icon}>🥤</div>
      <div className={styles.info}>
        <p className={styles.amount}>{data.amount} ml</p>
        <p className={styles.time}>{data.time}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setIsEditOpen(true)}>✏️</button>
        <button onClick={handleOpenModel}>🗑️</button>
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
