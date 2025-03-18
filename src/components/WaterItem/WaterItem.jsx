import React, { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import styles from "./WaterItem.module.css";
import { useDispatch } from "react-redux";
import { deleteWater, getWaterPerDay } from "../../redux/water/operations.js";
import { useTranslation } from "react-i18next";

const WaterItem = ({ data, formattedDate }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteWater(id)).unwrap();
      dispatch(getWaterPerDay(formattedDate));
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  return (
    <div className={styles.waterItem}>
      <div className={styles.icon}>
        <svg className={styles.waterGlass}>
          <use href="/sprite.svg#icon-water-glass-fill"></use>
        </svg>
      </div>
      <div className={styles.info}>
        <p className={styles.amount}>{data.volume} {t("waterDailyNorma.ml")}</p>
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
      <WaterModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        initialData={data}
      />
      <DeleteWaterModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onClick={() => handleDelete(data._id)} // Используем handleDelete здесь
      />
    </div>
  );
};

export default WaterItem;
