import { useDispatch, useSelector } from "react-redux";
import s from "./UserSettingsForm.module.css";
import { selectLoading, selectUser } from "../../redux/user/selectors.js";
// import { userSettingsValidationSchema } from "../../validationSchemas/userSettingsValidation.js";
// import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  fetchUserProfile,
  updateUserAvatar,
  updateUserProfile,
} from "../../redux/user/operations.js";
import { useEffect, useState } from "react";
import { PiExclamationMarkBold } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBottleWater } from "@fortawesome/free-solid-svg-icons";

const UserSettingsForm = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectLoading);
  const [preview, setPreview] = useState(user.avatarUrl);

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    // resolver: yupResolver(userSettingsValidationSchema),
    mode: "onChange",
    defaultValues: {
      name: user.name,
      email: user.email,
      gender: user.gender,
      weight: user.weight,
      dailySportTime: user.dailySportTime,
      dailyNorm: user.dailyNorm / 1000,
      avatarUrl: user.avatarUrl,
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        dailyNorm: user.dailyNorm > 0 ? user.dailyNorm / 1000 : 1.5,
      });
      // setPreview(user.avatarUrl);
      setPreview(
        user.avatarUrl && user.avatarUrl !== "null"
          ? user.avatarUrl
          : "/img/avatar.png"
      );
    }
  }, [user, reset]);

  const gender = watch("gender");
  const weight = watch("weight");
  const dailySportTime = watch("dailySportTime");

  const countDailyNorma = () => {
    if (weight === 0 && dailySportTime === 0)
      return `1.5 ${t("waterDailyNorma.l")}`;
    return gender === "woman"
      ? (weight * 0.03 + dailySportTime * 0.4).toFixed(1) +
          `${t("waterDailyNorma.l")}`
      : (weight * 0.04 + dailySportTime * 0.6).toFixed(1) +
          `${t("waterDailyNorma.l")}`;
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    try {
      await dispatch(updateUserAvatar(file)).unwrap();
      toast.success(t("userSettings.avatarUpdatedSuccess"));
    } catch (error) {
      toast.error(error.message || t("userSettings.avatarUpdateError"));
    }
  };

  const onSubmit = async (data) => {
    try {
      const userData = {
        name: data.name || "User",
        email: data.email,
        gender: data.gender,
        weight: data.weight || 0,
        dailySportTime: data.dailySportTime || 0,
        dailyNorm: data.dailyNorm * 1000 || 1500,
      };

      await dispatch(updateUserProfile(userData)).unwrap();
      dispatch(fetchUserProfile());
      toast.success(t("userSettings.profileUpdatedSuccess"));
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      toast.error(error.message || t("userSettings.profileUpdateError"));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.formIconWrap}>
        {isLoading ? (
          <FontAwesomeIcon
            icon={faBottleWater}
            className={s.loaderFormSet}
            size="3x"
          />
        ) : (
          <label htmlFor="avatar">
            <img src={preview} alt="Avatar" />
            <div className={s.uploadBtn}>
              <svg className={s.uploadIcon} width="18" height="18">
                <use href="/sprite.svg#icon-upload" />
              </svg>
              <p>{t("userSettings.uploadPhoto")}</p>
            </div>
          </label>
        )}
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
        {errors.avatar && (
          <p className={s.formError}>{errors.avatar.message}</p>
        )}
      </div>
      <div className={s.wrapForDesktopOne}>
        <div className={s.partOne}>
          <fieldset>
            <legend className={s.inputName}>
              {t("userSettings.yourGenderIdentity")}
            </legend>

            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div className={s.genderWrap}>
                  <label className={s.genderLabel}>
                    <input
                      type="radio"
                      {...field}
                      value="woman"
                      checked={field.value === "woman"}
                    />
                    <span className={s.customRadio}></span>
                    {t("userSettings.woman")}
                  </label>
                  <label className={s.genderLabel}>
                    <input
                      type="radio"
                      {...field}
                      value="man"
                      checked={field.value === "man"}
                    />
                    <span className={s.customRadio}></span>
                    {t("userSettings.man")}
                  </label>
                </div>
              )}
            />
          </fieldset>
          {errors.gender && (
            <p className={s.formError}>{errors.gender.message}</p>
          )}

          <div className={s.wrapCredentials}>
            <label htmlFor="name" className={s.inputName}>
              {t("userSettings.yourName")}
            </label>
            <input
              id="name"
              {...register("name")}
              type="text"
              className={s.formInput}
              style={{ marginBottom: "14px" }}
            />
            {errors.name && (
              <p className={s.formError}>{errors.name.message}</p>
            )}
            <label htmlFor="email" className={s.inputName}>
              {" "}
              {t("userSettings.email")}
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              className={s.formInput}
              readOnly
              disabled
            />
          </div>
          <section className={s.formulaSection}>
            <h3 className={s.inputName}> {t("userSettings.myDailyNorma")}</h3>

            <div className={s.genderFormula}>
              <div className={s.genderFormulaPart}>
                <p>{t("userSettings.forWoman")}</p>
                <span>V = (M * 0.03) + (T * 0.4)</span>
              </div>
              <div className={s.genderFormulaPart}>
                <p>{t("userSettings.forMan")}</p>
                <span>V = (M * 0.04) + (T * 0.6)</span>
              </div>
            </div>

            <div className={s.wrapRule}>
              <p>
                <span>*</span>
                {t("userSettings.formulaExplanation")}
              </p>
            </div>
            <div className={s.wrapExclamation}>
              <PiExclamationMarkBold className={s.exclamation} />
              <p>{t("userSettings.activeTimeInHours")}</p>
            </div>
          </section>
        </div>
        <div className={s.partTwo}>
          <div className={s.infoForFormula}>
            <div>
              <label htmlFor="weight">{t("userSettings.yourWeight")}</label>
              <input
                id="weight"
                {...register("weight")}
                type="number"
                className={s.formInput}
              />
              {errors.weight && (
                <p className={s.formError}>{errors.weight.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="dailySportTime">
                {t("userSettings.activeSportTime")}
              </label>

              <input
                id="dailySportTime"
                {...register("dailySportTime")}
                type="number"
                className={s.formInput}
              />
              {errors.dailySportTime && (
                <p className={s.formError}>{errors.dailySportTime.message}</p>
              )}
            </div>
          </div>

          <div className={s.wrapRecommend}>
            <p>{t("userSettings.requiredWaterAmount")}</p>
            <span>{countDailyNorma()}</span>
          </div>
          <label htmlFor="dailyNorm" className={s.inputName}>
            {t("userSettings.writeWaterAmount")}
          </label>
          <input
            id="dailyNorm"
            {...register("dailyNorm")}
            type="number"
            step="any"
            className={s.formInput}
          />
          {errors.dailyNorm && (
            <p className={s.formError}>{errors.dailyNorm.message}</p>
          )}
        </div>
      </div>
      <button type="submit" className={s.formBtn}>
        {t("userSettings.save")}
      </button>
    </form>
  );
};

export default UserSettingsForm;
