import React from "react";

import { styled } from "@mui/system";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ScaleIcon from "@mui/icons-material/Scale";

import { useGetUserBodyWeights } from "../../../store/redux-store/slices/user/user.hooks";

import Chart from "../../../utils/LineChart";

const WeightChart: React.FC = () => {
  const { bodyWeights } = useGetUserBodyWeights();
  const labels: string[] = [];
  const data: number[] = [];

  bodyWeights?.map((bodyWeight) => labels.push(bodyWeight.date));
  bodyWeights?.map((bodyWeight) => data.push(bodyWeight.weight));

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

const WeightChartContainer = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  borderRadius: "0.5rem",
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const Header = styled("header")({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const CurrentWeightContainer = styled("div")({
  textAlign: "left",
});

const Content = styled("div")({
  display: "flex",
  alignItems: "flex-end",
  gap: "0.2rem",
});

export default WeightChart;
