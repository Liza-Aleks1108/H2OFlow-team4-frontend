import styles from "./AdvantagesSection.module.css";
import { useSelector } from "react-redux";
import {
  selectTotalAmount,
  selectLoading,
  selectError,
} from "../../redux/user/selectors";

const AdvantagesSection = () => {
  const totalUsers = useSelector(selectTotalAmount);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  return (
    <section className={styles.advantagesSection}>
      <div className={styles.advantagesContent}>
        <div className={styles.infoBox}>
          <div className={styles.userImages}>
            <img
              src="/img/cust1.png"
              srcSet="/img/cust1.png 1x, /img/cust1@2x.png 2x"
              alt="User 1"
            />
            <img
              src="/img/cust2.png"
              srcSet="/img/cust2.png 1x, /img/cust2@2x.png 2x"
              alt="User 2"
            />
            <img
              src="/img/cust3.png"
              srcSet="/img/cust3.png 1x, /img/cust3@2x.png 2x"
              alt="User 3"
            />
          </div>

          {loading ? (
            <p className={styles.loading}>Loading...</p>
          ) : error ? (
            <p className={styles.error}>Error: {error}</p>
          ) : (
            <p className={styles.infoText}>
              Our <span className={styles.highlight}>happy</span> customers:{" "}
              <span className={styles.userCount}>{totalUsers ?? 0}</span>
            </p>
          )}
        </div>

        <div className={styles.stats}>
          <p className={`${styles.benefits} ${styles.habitDrive}`}>
            <span className={styles.circle}></span>Habit drive
          </p>
          <p className={`${styles.benefits} ${styles.viewStats}`}>
            View statistics
          </p>
          <p className={`${styles.benefits} ${styles.personalRate}`}>Personal rate setting</p>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
