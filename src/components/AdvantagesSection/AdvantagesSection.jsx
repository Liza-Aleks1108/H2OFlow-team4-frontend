import { useEffect } from "react";
import styles from "./AdvantagesSection.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAmount } from "../../redux/user/operations";
import { selectTotalAmount, selectLoading, selectError } from "../../redux/user/selectors";

const AdvantagesSection = () => {
  const dispatch = useDispatch();
  const totalUsers = useSelector(selectTotalAmount);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(getUsersAmount());
  }, [dispatch]);

  return (
    <section className={styles.advantagesSection}>
      <div className={styles.advantagesContent}>
        <div className={styles.infoBox}>
          <div className={styles.userImages}>
            <img src="/img/cust1.png" srcSet="/img/cust1.png 1x, /img/cust1@2x.png 2x" alt="User 1" />
            <img src="/img/cust2.png" srcSet="/img/cust2.png 1x, /img/cust2@2x.png 2x" alt="User 2" />
            <img src="/img/cust3.png" srcSet="/img/cust3.png 1x, /img/cust3@2x.png 2x" alt="User 3" />
          </div>

          {loading ? (
            <p className={styles.loading}>Loading...</p>
          ) : error ? (
            <p className={styles.error}>Error: {error}</p>
          ) : (
            <p className={styles.infoText}>
              Our <span className={styles.highlight}>happy</span> customers: {" "}
              <span className={styles.userCount}>{totalUsers ?? 0}</span>
            </p>
          )}
        </div>

        <div className={styles.stats}>
          <button className={`${styles.btn} ${styles.habitDrive}`}>
            <span className={styles.circle}></span>Habit drive
          </button>
          <button className={`${styles.btn} ${styles.viewStats}`}>View statistics</button>
          <p className={styles.personalRate}>Personal rate setting</p>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;