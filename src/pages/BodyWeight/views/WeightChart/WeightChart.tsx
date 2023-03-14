import React from "react";

import { Typography, Box, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import { useUserContext } from "../../../../contexts/userContext";

import { generateChartData } from "../../../../utils/ChartData";
import { Chart } from "../../../../utils/LineChart";

import { ChartType } from "../../../../shared/enums";

export const WeightChart: React.FC = () => {
  const { user } = useUserContext();
  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));

  const chartOptions = {
    aspectRatio: isDownSm ? 1 / 1 : 3 / 1,
    scales: {
      x: {
        type: "time",
        time: {
          unit: "day",
        },
      },
    },
  };

  const { labels, data } = generateChartData(
    ChartType.weight,
    user?.bodyWeights!
  );

  const isLosingWeight = data[data.length - 1] < data[data.length - 2];

  return (
    <WeightChartContainer>
      <Chart data={data} labels={labels} options={chartOptions} />

      <CurrentWeightContainer>
        <Typography variant="caption" color="grey">
          CURRENT WEIGHT
        </Typography>
        <Content>
          {isLosingWeight ? (
            <ArrowDownwardIcon color="success" />
          ) : (
            <ArrowUpwardIcon color="error" />
          )}
          <Typography>{data[data.length - 1]} KG</Typography>
        </Content>
      </CurrentWeightContainer>
    </WeightChartContainer>
  );
};

const WeightChartContainer = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingBottom: `${theme.spacing(2)} 0`,
  margin: `${theme.spacing(2)} 0`,
  background: theme.palette.background.default,
}));

const CurrentWeightContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
  top: theme.spacing(2),
}));

const Content = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  gap: "0.2rem",
});
