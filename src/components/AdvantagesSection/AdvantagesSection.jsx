import {useEffect, useState} from "react";
import axios from "axios"
import styles from  "./AdvantagesSection.module.css";

const AdvantagesSection = () => {
  const [totalUsers, setTotalUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("/api/users/count");
        setTotalUsers(response.data.count);
      } catch (error) {
        console.error("Error fetching users count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);

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
          <p className={styles.infoText}>
            Our <span className={styles.highlight}>happy</span> customers: {" "}
            {!loading ? <span className={styles.userCount}>{totalUsers}</span> : <span className={styles.loading}>Loading...</span>}
          </p>
        </div>
        <div className={styles.stats}>
          <button className={`${styles.btn} ${styles.habitDrive}`}><span className={styles.circle}></span>Habit drive</button>
          <button className={`${styles.btn} ${styles.viewStats}`}>View statistics</button>
          <p className={styles.personalRate}>Personal rate setting</p>
        </div>
      </div>
    </section>
  );
};

export default AdvantagesSection;