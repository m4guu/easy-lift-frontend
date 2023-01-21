import { BodyWeight } from "../../shared/interfaces";
import { ChartType } from "../../shared/enums";

export const generateChartData = (
  chartType: ChartType,
  chartData: BodyWeight[]
) => {
  let labels: string[] = [];
  let data: number[] = [];

  switch (chartType) {
    case ChartType.weight:
      labels = chartData?.map((bodyWeight) => bodyWeight.date);
      data = chartData?.map((bodyWeight) => bodyWeight.weight);
      break;
    default:
      break;
  }
  return { labels, data };
};
