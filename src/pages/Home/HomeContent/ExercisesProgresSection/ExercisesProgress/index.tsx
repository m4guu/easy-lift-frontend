import React, { useState } from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../../../../contexts/userContext";

import { Chart } from "../../../../../utils/LineChart";
import { ChartMenu } from "./ChartMenu";

import { ChartMenuData } from "../../../../../shared/interfaces";

export const ExercisesProgress: React.FC = () => {
  const { user } = useUserContext();

  const [labels, setLabels] = useState<string[]>([]);
  const [data, setData] = useState<number[]>([]);
  const [dateRange, setDateRange] = useState<string>("");

  const aspectRatio = 2 / 1;

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
      {user && <ChartMenu userId={user.id} sendData={getChildData} />}
    </ExercisesProgressContainer>
  );
};

const ExercisesProgressContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("xl")]: {
    display: "flex",
  },
}));
