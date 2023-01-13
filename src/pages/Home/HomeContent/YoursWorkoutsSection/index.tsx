import React from "react";

import { Typography } from "@mui/material";
import styled from "@mui/system/styled";

import WorkoutList from "./WorkoutList";

const YoursWorkoutsSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="caption">yours workouts</Typography>
      </SectionHeader>
      <WorkoutList />
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));
const SectionHeader = styled("header")(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}));
export default YoursWorkoutsSection;
