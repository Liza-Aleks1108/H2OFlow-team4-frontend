import WaterItem from "../WaterItem/WaterItem";
import styles from "./WaterList.module.css";

const WaterList = ({ waterData, formattedDate }) => {
  return (
    <ul className={styles.waterList}>
      {waterData.map((data, index) => (
        <WaterItem
          key={`${data._id}-${index}`}
          data={data}
          formattedDate={formattedDate}
        />
      ))}
    </ul>
  );
};

export default WaterList;
