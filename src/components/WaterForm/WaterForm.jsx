import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
// import {
//   setWaterData,
//   setError,
//   setLoading,
// } from "../../redux/water/operations.js";
import css from "./WaterForm.module.css";
import { selectLoading, selectWaterDate } from "../../redux/water/selectors.js";
import {
  addWater,
  editWaterAmount,
  getWaterPerDay,
} from "../../redux/water/operations.js";
import { useTranslation } from "react-i18next";

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

const WaterForm = ({ operationType, initialData, onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  //   const { waterData, error, isLoading } = useSelector(
  //     (state) => state.user.userData
  //   );
  const isLoading = useSelector(selectLoading);
  const waterDate = useSelector(selectWaterDate);

  const { control, handleSubmit, setValue, watch } = useForm({
    // resolver: yupResolver(schema),
    defaultValues: {
      amount: initialData?.volume || 50,
      time:
        initialData?.time ||
        new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
  });

  const amount = watch("amount");

  useEffect(() => {
    if (initialData) {
      setValue("amount", initialData.volume || 50);
      setValue(
        "time",
        initialData.time ||
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
      );
    }
  }, [initialData, setValue]);

  const handleIncrement = () => setValue("amount", Number(amount) + 50);
  const handleDecrement = () => setValue("amount", Math.max(amount - 50, 0));

  const onSubmit = async (data) => {
    const waterEntry = {
      _id: initialData?._id,
      volume: String(data.amount),
      day: initialData?.day || new Date().toISOString().split("T")[0],
      time: initialData?.time || data.time,
    };

    try {
      if (operationType === "add") {
        console.log("Дані, що відправляються на добавлення:", waterEntry);
        await dispatch(addWater(waterEntry)).unwrap();
      } else {
        console.log("Дані, що відправляються на редактування:", waterEntry);
        await dispatch(editWaterAmount(waterEntry)).unwrap();
      }
      dispatch(getWaterPerDay(waterEntry.day));
      onClose();
    } catch (err) {
      console.error("Помилка при збереженні данних", err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
      <div className={css.field}>
        <h3 className={css.subTitle}>{t("waterForm.chooseValue")}</h3>
        <label className={css.labelText}>{t("waterForm.amount")}</label>
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
                value={`${field.value} ${t("waterDailyNorma.ml")}`}
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
        <label className={css.labelText}>{t("waterForm.recordingTime")}</label>
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
        {t("waterForm.enterValue")}
        </label>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <input {...field} type="number" className={css.input} />
          )}
        />
      </div>
      {/* {error && <p className={css.error}>{error}</p>} */}
      <button type="submit" disabled={isLoading} className={css.submitButton}>
        {isLoading ? t("waterForm.saving") : t("waterForm.save")}
      </button>
    </form>
  );
};

export default WaterForm;
