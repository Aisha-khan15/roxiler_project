import styles from "./Stats.module.css";

export default function Stats(props) {
  return (
    <div className={styles.div}>
      <div className={styles.container}>
        <h3 className={styles.heading}>Statistics - {props?.selectedMonth}</h3>
        <div className={styles.text}>
          <p>Total sale</p>
          <p>{props?.stats?.totalSaleAmount}</p>
        </div>
        <div className={styles.text}>
          <p>Total sold item</p>
          <p>{props?.stats?.totalSoldItems}</p>
        </div>
        <div className={styles.text}>
          <p>Total not sold item</p>
          <p>{props?.stats?.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
}
