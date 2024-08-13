import styles from "./Table.module.css";

export default function Table(props) {
  const list = props?.products?.map((product) => (
    <tr key={product._id}>
      <td className={styles.col1}>{product?._id}</td>
      <td className={styles.col1}>{product?.title}</td>
      <td className={styles.col2}>{product?.description}</td>
      <td className={styles.col1}>{product?.price}</td>
      <td className={styles.col1}>{product?.category}</td>
      <td className={styles.col1}>{product?.sold ? "Yes" : "No"}</td>
      <td className={styles.col2}>
        <img
          src={product?.image}
          alt=""
          style={{ maxWidth: "15rem", maxHeight: "5rem" }}
        />
      </td>
    </tr>
  ));
  return (
    <div className={styles.TableContent}>
      <table className={styles.table}>
        <tr>
          <th className={styles.col1}>ID</th>
          <th className={styles.col1}>Title</th>
          <th className={styles.col2}>Description</th>
          <th className={styles.col1}>Price</th>
          <th className={styles.col1}>Category</th>
          <th className={styles.col1}>Sold</th>
          <th className={styles.col2}>Image</th>
        </tr>
        {props?.totalCount ? (
          list
        ) : (
          <tr style={{ textAlign: "center" }}>No data to list</tr>
        )}
      </table>
    </div>
  );
}
