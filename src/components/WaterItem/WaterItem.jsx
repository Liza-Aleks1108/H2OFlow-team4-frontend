import React, { useState } from "react";
import WaterModal from "../WaterModal/WaterModal";
import DeleteWaterModal from "../DeleteWaterModal/DeleteWaterModal";
import styles from "./WaterItem.module.css";
import { useDispatch } from "react-redux";
import { deleteWater } from "../../redux/water/operations.js";

const WaterItem = ({ data }) => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // const handleDelete = () => {
  //   console.log(`Видаляємо запис води з id: ${data._id}`);
  //   onDelete(data._id); // Видаляємо елемент без анімації "зникнення"
  //   setIsDeleteOpen(false); // Закриваємо модалку після видалення
  // };

  // const Item = ({ completed, text, id }) => {
  // return (
  //   <li className={s.item}>
  //     <input type='checkbox' checked={completed} onChange={() => dispatch(toggleTodo({ id, text, completed: !completed }))} />
  //     <p>{text}</p>
  //     <div>
  //       <button onClick={() => dispatch(editTodo({ id, text: prompt('Enter new value: ') ?? text }))}>Edit</button>
  //       <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
  //     </div>
  //   </li>
  // );

  return (
    <div className={styles.waterItem}>
      <div className={styles.icon}>
        <svg className={styles.waterGlass}>
          <use href="/sprite.svg#icon-water-glass-fill"></use>
        </svg>
      </div>
      <div className={styles.info}>
        <p className={styles.amount}>{data.amount} ml</p>
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
        // handleDelete={handleDelete}
        onClick={() => dispatch(deleteWater(data._id))}
      />
    </div>
  );
};

export default WaterItem;
