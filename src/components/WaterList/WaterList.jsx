import WaterItem from "../WaterItem/WaterItem";
import styles from "./WaterList.module.css";

const WaterList = ({ waterData, formattedDate }) => {
  return (
    <ul className={styles.waterList}>
      {waterData.map((data) => (
        <WaterItem key={data._id} data={data} formattedDate={formattedDate} />
      ))}
    </ul>
  );
};

export default WaterList;
