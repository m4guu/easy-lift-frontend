import React from "react";

import { styled } from "@mui/system";
import { Typography, Box } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ScaleIcon from "@mui/icons-material/Scale";

import { useGetUserBodyWeights } from "../../../store/redux-store/slices/user/user.hooks";

import { generateChartData } from "../../../utils/ChartData";
import Chart from "../../../utils/LineChart";

import { ChartType } from "../../../shared/enums";

const WeightChart: React.FC = () => {
  const { bodyWeights } = useGetUserBodyWeights();
  const { labels, data } = generateChartData(ChartType.weight, bodyWeights!);

  const isLosingWeight = data[data.length - 1] < data[data.length - 2];

  return (
    <WeightChartContainer>
      <Header>
        <ScaleIcon color="primary" />
        <Typography>BODY WEIGHT</Typography>
        <Typography variant="h3" color="grey">
          KG
        </Typography>
      </Header>
      <Chart data={data} labels={labels} options={chartOptions} />
      <CurrentWeightContainer>
        <Typography variant="h3" color="grey">
          CURRENT
        </Typography>
        <Content>
          {isLosingWeight ? (
            <ArrowDownwardIcon color="success" />
          ) : (
            <ArrowUpwardIcon color="error" />
          )}
          <Typography>{data[data.length - 1]}</Typography>
        </Content>
      </CurrentWeightContainer>
    </WeightChartContainer>
  );
};

const chartOptions = {
  aspectRatio: 1 / 1,
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
      },
    },
  },
};

const WeightChartContainer = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  borderRadius: "0.5rem",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const Header = styled("header")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const CurrentWeightContainer = styled(Box)({
  textAlign: "left",
});

const Content = styled(Box)({
  display: "flex",
  alignItems: "flex-end",
  gap: "0.2rem",
});

export default WeightChart;
