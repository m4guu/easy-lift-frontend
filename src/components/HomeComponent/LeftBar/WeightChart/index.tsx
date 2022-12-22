import React from "react";

import { styled } from "@mui/system";
import ScaleIcon from "@mui/icons-material/Scale";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Typography from "@mui/material/Typography";

const WeightChart: React.FC = () => {
  return (
    <WeightChartContainer>
      <Header>
        <ScaleIcon color="primary" />
        <Typography variant="h3">WEIGHT</Typography>
        <Typography variant="h3" color="grey">
          KG
        </Typography>
      </Header>
      CHART
      <CurrentWeightContainer>
        <Typography variant="h3" color="grey">
          CURRENT
        </Typography>
        <Content>
          <ArrowUpwardIcon color="error" />
          <Typography variant="h3">102</Typography>
        </Content>
      </CurrentWeightContainer>
    </WeightChartContainer>
  );
};

const WeightChartContainer = styled("div")(({ theme }) => ({
  background: theme.palette.secondary.light_2,
  padding: theme.spacing(1),
  borderRadius: "0.5rem",
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
