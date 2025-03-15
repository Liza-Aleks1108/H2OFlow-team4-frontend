import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  setWaterData,
  setError,
  setLoading,
} from "../../redux/water/operations.js";
import css from "./WaterForm.module.css";

// const schema = yup.object().shape({
//   amount: yup
//     .number()
//     .required("Кількість води обовʼязкова")
//     .min(1, "Мінімум 1 мл"),
//   time: yup
//     .string()
//     .required("Час обовʼязковий")
//     .matches(/^\d{2}:\d{2}$/, "Формат час y: hh:mm"),
// });

const WaterForm = ({ operationType, onClose }) => {
  const dispatch = useDispatch();
  const { waterData, error, isLoading } = useSelector(
    (state) => state.user.userData
  );
  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      amount: waterData?.amount || 50,
      time:
        waterData?.time ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  });

  const amount = watch("amount");

  const handleIncrement = () => setValue("amount", Number(amount) + 50);
  const handleDecrement = () => setValue("amount", Math.max(amount - 50, 0));

  const onSubmit = async (data) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch("/api/water", {
        method: operationType === "add" ? "POST" : "PATCH",
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Помилка при збереженні даних");
      dispatch(setWaterData(data));
      onClose();
    } catch (err) {
      dispatch(setError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.field}>
        <h3 className={css.subTitle}>Choose a value</h3>
        <label className={css.labelText}>Amount of water:</label>
        <div className={css.counter}>
          <button
            type="button"
            onClick={handleDecrement}
            className={css.circleBtn}
          >
            <svg className={css.iconCircle}>
              <use
                href={`${window.location.origin}/sprite.svg#icon-circle-minus`}
              ></use>
            </svg>
          </button>

          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={css.blackInput}
                value={`${field.value} ml`}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setValue("amount", value ? Number(value) : 0);
                }}
              />
            )}
          />
          <button
            type="button"
            onClick={handleIncrement}
            className={css.circleBtn}
          >
            <svg className={css.iconCircle}>
              <use
                href={`${window.location.origin}/sprite.svg#icon-circle-plus`}
              ></use>
            </svg>
          </button>
        </div>
      </div>
      <div className={css.field}>
        <label className={css.labelText}>Recording time:</label>
        <Controller
          name="time"
          control={control}
          render={({ field }) => (
            <input {...field} type="text" className={css.input} />
          )}
        />
      </div>
      <div className={css.field}>
        <label className={css.secondSubTitle}>
          Enter the value of the water used:
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input {...field} type="number" className={css.input} />
          )}
        />
      </div>
      {error && <p className={css.error}>{error}</p>}
      <button type="submit" disabled={isLoading} className={css.submitButton}>
        {isLoading ? "Saving..." : "Save"}
      </button>
    </form>
  );
};

export default WaterForm;
