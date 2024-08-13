import { useEffect, useState } from "react";
import Table from "../components/Table";
import TableHeadComponents from "../components/TableHeadComponents";
import styles from "./Dashboard.module.css";
import Pagination from "../components/Pagination";
import Stats from "../components/Stats";
import Charts from "../components/Charts";
import axios from "axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("March");
  const [selectedYear, setSelectedYear] = useState("2022");

  const [pageNumber, setPageNumber] = useState(1);

  const [stats, setStats] = useState();

  const [chartData, setChartData] = useState([]);

  const backendUrl = "http://localhost:5000/";

  useEffect(() => {
    async function fetchData() {
      const res1 = await axios.get(
        `${backendUrl}api/v1/transactions?month=${selectedYear}-${selectedMonth}&search=${search}`
      );
      setProducts(res1.data.transactions);
      setTotalCount(res1.data.totalCount);

      const res2 = await axios.get(
        `${backendUrl}api/v1/statistics?month=${selectedYear}-${selectedMonth}`
      );
      setStats(res2.data);

      const res3 = await axios.get(
        `${backendUrl}api/v1/bar?month=${selectedYear}-${selectedMonth}`
      );
      setChartData(res3.data);
    }
    fetchData();
  }, [search, selectedMonth, selectedYear, pageNumber]);

  return (
    <div className={styles.div}>
      <h2 className={styles.title}>Transcation Dashboard</h2>
      <TableHeadComponents
        searchHandle={{ search, setSearch }}
        monthHandle={{ selectedMonth, setSelectedMonth }}
        yearHandle={{ selectedYear, setSelectedYear }}
      />
      <Table products={products} totalCount={totalCount} />
      <Pagination
        pageHandler={{ pageNumber, setPageNumber }}
        totalCount={totalCount}
      />

      <Stats selectedMonth={selectedMonth} stats={stats} />

      <Charts selectedMonth={selectedMonth} data={chartData} />
    </div>
  );
}
