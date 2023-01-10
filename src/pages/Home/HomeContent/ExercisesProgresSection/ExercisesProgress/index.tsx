import React, { useState } from "react";

import { styled, useTheme } from "@mui/system";

import useWindowWidth from "../../../../../hooks/useWindowWidth";

import Chart from "../../../../../utils/LineChart";
import ChartMenu from "./ChartMenu";

const ExercisesProgress: React.FC = () => {
  const [labels, setLabels] = useState([""]);
  const [data, setData] = useState([0]);
  const [dateRange, setDateRange] = useState("");

  const theme = useTheme();
  const windowWidth = useWindowWidth();

  const isBetweenSmLgBreakpoints =
    theme.breakpoints.values.sm < windowWidth &&
    windowWidth < theme.breakpoints.values.lg;

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

  const getChildData = (childData: {
    labels: string[];
    data: number[];
    dateRange: string;
  }) => {
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

const ExercisesProgressContainer = styled("div")(({ theme }) => ({
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
