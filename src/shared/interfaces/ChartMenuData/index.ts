import ChartData from "../ChartData";

interface ChartMenuData {
  labels: ChartData["labels"];
  data: ChartData["data"];
  dateRange: string;
}
export default ChartMenuData;
