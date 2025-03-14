import { useDispatch, useSelector } from "react-redux";
import s from "./UserSettingsForm.module.css";
import { selectUser } from "../../redux/user/selectors.js";
import { userSettingsValidationSchema } from "../../validationSchemas/userSettingsValidation.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateUserAvatar,
  updateUserProfile,
} from "../../redux/user/operations.js";
import { useEffect, useState } from "react";
import { PiExclamationMarkBold } from "react-icons/pi";

const UserSettingsForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [preview, setPreview] = useState(user.avatarUrl || "/img/avatar.png");

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSettingsValidationSchema),
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
      setPreview(user.avatarUrl);
    }
  }, [user, reset]);

  const gender = watch("gender");
  const weight = watch("weight");
  const dailySportTime = watch("dailySportTime");

  const countDailyNorma = () => {
    if (weight === 0 && dailySportTime === 0) return "1.5 L";
    return gender === "woman"
      ? (weight * 0.03 + dailySportTime * 0.4).toFixed(1) + " L"
      : (weight * 0.04 + dailySportTime * 0.6).toFixed(1) + " L";
  };

  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    try {
      await dispatch(updateUserAvatar(file)).unwrap();
      toast.success("Avatar updated successfully!");
    } catch (error) {
      toast.error(error.message || "Failed to update avatar");
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
      toast.success("Profile updated successfully!");
      onClose();
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={s.formIconWrap}>
        <label htmlFor="avatar">
          <img src={preview} alt="Avatar" />
          <div className={s.uploadBtn}>
            <svg className={s.uploadIcon} width="18" height="18">
              <use href="/sprite.svg#icon-upload" />
            </svg>
            <p>Upload a photo</p>
          </div>
        </label>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
        {/* <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={(event) => {
                field.onChange(event.target.files);
                if (event.target.files[0]) {
                  setPreview(URL.createObjectURL(event.target.files[0]));
                }
              }}
            />
          )}
        /> */}
        {errors.avatar && (
          <p className={s.formError}>{errors.avatar.message}</p>
        )}
      </div>
      <div className={s.wrapForDesktopOne}>
        <div className={s.partOne}>
          <fieldset>
            <legend className={s.inputName}>Your gender identity</legend>

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
                    Woman
                  </label>
                  <label className={s.genderLabel}>
                    <input
                      type="radio"
                      {...field}
                      value="man"
                      checked={field.value === "man"}
                    />
                    <span className={s.customRadio}></span>
                    Man
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
              Your name
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
              Email
            </label>
            <input
              id="email"
              {...register("email")}
              type="email"
              className={s.formInput}
              readOnly
            />
          </div>
          <section className={s.formulaSection}>
            <h3 className={s.inputName}>My daily norma</h3>

            <div className={s.genderFormula}>
              <div className={s.genderFormulaPart}>
                <p>For woman:</p>
                <span>V = (M * 0.03) + (T * 0.4)</span>
              </div>
              <div className={s.genderFormulaPart}>
                <p>For man:</p>
                <span>V = (M * 0.04) + (T * 0.6)</span>
              </div>
            </div>

            <div className={s.wrapRule}>
              <p>
                <span>*</span> V is the volume of the water norm in liters per
                day, M is your body weight, T is the time of active sports, or
                another type of activity commensurate in terms of loads (in the
                absence of these, you must set 0).
              </p>
            </div>
            <div className={s.wrapExclamation}>
              <PiExclamationMarkBold className={s.exclamation} />
              <p>Active time in hours</p>
            </div>
          </section>
        </div>
        <div className={s.partTwo}>
          <div className={s.infoForFormula}>
            <div>
              <label htmlFor="weight">Your weight in kilograms:</label>
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
                The time of active participation in sports:
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
            <p>The required amount of water in liters per day:</p>
            <span>{countDailyNorma()}</span>
          </div>
          <label htmlFor="dailyNorm" className={s.inputName}>
            Write down how much water you will drink:
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
        Save
      </button>
    </form>
  );
};

export default UserSettingsForm;
