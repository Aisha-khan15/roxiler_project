import styles from "./Table.module.css";

export default function TableHeadComponents(props) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search"
        value={props?.searchHandle?.search}
        onChange={(e) => props?.searchHandle?.setSearch(e.target.value)}
      />

      <select
        value={props?.monthHandle?.selectedMonth}
        onChange={(e) => props?.monthHandle?.setSelectedMonth(e.target.value)}
        placeholder="Select Month"
        className={styles.select}
      >
        {months.map((month, index) => (
          <option value={month} key={index}>
            {month}
          </option>
        ))}
      </select>

      <select
        value={props?.yearHandle?.selectedYear}
        onChange={(e) => props?.yearHandle?.setSelectedYear(e.target.value)}
        placeholder="Select Year"
        className={styles.select}
      >
        <option value={2022}>2022</option>
        <option value={2023}>2023</option>
      </select>
    </div>
  );
}
