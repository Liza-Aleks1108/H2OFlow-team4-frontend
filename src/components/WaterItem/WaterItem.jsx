import React, { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import styles from "./WaterItem.module.css";
import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/operations.js";

const WaterItem = ({ data, formattedDate }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Функция для удаления
  const handleDelete = async (id) => {
    await dispatch(deleteWater(id)); // Удаляем запись
    dispatch(getWaterPerDay(formattedDate)); // Загружаем обновлённый список
    setIsDeleteOpen(false); // Закрываем модалку удаления
  };

  return (
    <div className={styles.waterItem}>
      <div className={styles.icon}>
        <svg className={styles.waterGlass}>
          <use href="/sprite.svg#icon-water-glass-fill"></use>
        </svg>
      </div>
      <div className={styles.info}>
        <p className={styles.amount}>{data.volume} ml</p>
        <p className={styles.time}>{data.time}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={() => setIsEditOpen(true)}>
          <svg className={styles.editIcon}>
            <use href="/sprite.svg#icon-Vector-pen"></use>
          </svg>
        </button>
        <button onClick={() => setIsDeleteOpen(true)}>
          <svg className={styles.deleteIcon}>
            <use href="/sprite.svg#icon-trash-04"></use>
          </svg>
        </button>
      </div>
      <WaterModal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)} />
      <DeleteWaterModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onClick={() => handleDelete(data._id)} // Используем handleDelete здесь
      />
    </div>
  );
};

export default WaterItem;
