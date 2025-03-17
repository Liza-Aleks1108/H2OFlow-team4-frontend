import WaterItem from "../WaterItem/WaterItem";
import styles from "./WaterList.module.css";

const WaterList = ({ waterData, formattedDate }) => {
  // const [waterData, setWaterData] = useState(initialWaterData);
  // const dispatch = useDispatch();
  // const waterCard = useSelector(selectDay);
  // console.log("waterCard", waterCard);

  // useEffect(() => {
  //   getWaterPerDay();
  // }, [dispatch]);

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
