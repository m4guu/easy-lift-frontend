import React from "react";

import useTheme from "@mui/system/useTheme";

import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  TimeScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const defaultOptions: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
};

type ChartProps = {
  labels: string[];
  data: number[];
  options: ChartOptions;
};

export const Chart: React.FC<ChartProps> = ({ labels, data, options }) => {
  const theme = useTheme();

  const chartData = {
    labels,
    datasets: [
      {
        data,
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.common.black,
      },
    ],
  };

  return <Line options={{ ...defaultOptions, ...options }} data={chartData} />;
};
