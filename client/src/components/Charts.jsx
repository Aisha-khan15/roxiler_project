import ChartDisplayer from "./ChartDisplayer";

export default function Charts(props) {
  return (
    <div>
      <h3>Bar Charts Stats - {props?.selectedMonth}</h3>

      <ChartDisplayer data={props?.data} />
    </div>
  );
}
