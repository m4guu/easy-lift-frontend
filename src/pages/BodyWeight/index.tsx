import React from "react";

import { styled } from "@mui/system";

import { SectionHeader } from "../../components";
import { AddWeight } from "./views/AddWeight/AddWeight";
import { WeightChart } from "./views/WeightChart/WeightChart";
import { WeightHistory } from "./views/WeightHistory/WeightHistory";

const BodyWeight: React.FC = () => {
  return (
    <SectionContainer>
      <SectionHeader>body weight</SectionHeader>

      <WeightChart />
      <AddWeight />
      <WeightHistory />
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  position: "relative",
}));
export default BodyWeight;
