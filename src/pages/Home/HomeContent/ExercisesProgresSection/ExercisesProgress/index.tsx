import React, { useState } from "react";

import { useMediaQuery, Box } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { Chart } from "../../../../../utils/LineChart";
import { ChartMenu } from "./ChartMenu";

import { ChartMenuData } from "../../../../../shared/interfaces";

export const ExercisesProgress: React.FC = () => {
  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<string>("");

  const theme = useTheme();
  const isBetweenSmLgBreakpoints = useMediaQuery(
    theme.breakpoints.between("sm", "lg")
  );

  const aspectRatio = isBetweenSmLgBreakpoints ? 2 / 1 : 1 / 1;

  const chartOptions = {
    aspectRatio,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
        min: dateRange,
      },
    },
  };

  const getChildData = (childData: ChartMenuData) => {
    setLabels(childData.labels);
    setData(childData.data);
    setDateRange(childData.dateRange);
  };

  return (
    <ExercisesProgressContainer>
      <Chart labels={labels} data={data} options={chartOptions} />
      <ChartMenu sendData={getChildData} />
    </ExercisesProgressContainer>
  );
};

const ExercisesProgressContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "flex",
  },
}));
