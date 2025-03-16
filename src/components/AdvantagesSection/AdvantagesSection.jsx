import styles from "./AdvantagesSection.module.css";
import { useSelector } from "react-redux";
import {
  selectTotalAmount,
  selectLoading,
  selectError,
} from "../../redux/user/selectors";
import { useTranslation } from "react-i18next";

const AdvantagesSection = () => {
  const { t } = useTranslation();
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
            <p className={styles.loading}>{t("advantages.loading")}</p>
          ) : error ? (
            <p className={styles.error}>
              {t("advantages.error")}
              {error}
            </p>
          ) : (
            <p className={styles.infoText}>
              {t("advantages.our")}{" "}
              <span className={styles.highlight}>{t("advantages.happy")}</span>{" "}
              {t("advantages.customers")}{" "}
              <span className={styles.userCount}>{totalUsers ?? 0}</span>
            </p>
          )}
        </div>

        <div className={styles.stats}>
          <p className={`${styles.benefits} ${styles.habitDrive}`}>
            <span className={styles.circle}></span>{t("advantages.habitDrive")}
          </p>
          <p className={`${styles.benefits} ${styles.viewStats}`}>
            {t("advantages.viewStats")}
          </p>
          <p className={`${styles.benefits} ${styles.personalRate}`}>
            {t("advantages.personalRate")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;
