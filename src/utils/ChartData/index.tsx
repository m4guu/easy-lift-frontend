import { BodyWeight, ChartData } from "../../shared/interfaces";
import { ChartType } from "../../shared/enums";

export const generateChartData = (
  chartType: ChartType,
  chartData: BodyWeight[] | undefined
) => {
  const labels: ChartData["labels"] = [];
  const data: ChartData["data"] = [];

  switch (chartType) {
    case ChartType.weight:
      chartData?.map((bodyWeight) => labels.push(bodyWeight.date));
      chartData?.map((bodyWeight) => data.push(bodyWeight.weight));
      break;

    default:
      break;
  }
  return { labels, data };
};
