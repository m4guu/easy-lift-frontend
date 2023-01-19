import React, { useState } from "react";

import { useMediaQuery, Box } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import Chart from "../../../../../utils/LineChart";
import ChartMenu from "./ChartMenu";

import { ChartMenuData, ChartData } from "../../../../../shared/interfaces";

const ExercisesProgress: React.FC = () => {
  const [labels, setLabels] = useState<ChartData["labels"]>([]);
  const [data, setData] = useState<ChartData["data"]>([]);
  const [dateRange, setDateRange] = useState("");

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
  display: "flex",
  width: "80%",
  [theme.breakpoints.up("lg")]: {
    height: "90%",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

export default ExercisesProgress;
