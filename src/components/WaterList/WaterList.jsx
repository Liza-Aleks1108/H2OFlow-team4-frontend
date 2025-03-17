import WaterItem from "../WaterItem/WaterItem";
import styles from "./WaterList.module.css";

const WaterList = ({ waterData, formattedDate }) => {
  return (
    <div className={styles.waterList}>
      <ul>
        {waterData.map((data) => (
          <WaterItem key={data._id} data={data} formattedDate={formattedDate} />
        ))}
      </ul>
    </div>
  );
};

export default WaterList;
