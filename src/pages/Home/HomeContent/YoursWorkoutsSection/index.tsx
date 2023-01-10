import React from "react";

import { Typography } from "@mui/material";
import styled from "@mui/system/styled";

import WorkoutList from "./WorkoutList";

const YoursWorkoutsSection: React.FC = () => {
  return (
    <SectionContainer>
      <header>
        <Typography variant="caption">yours workouts</Typography>
      </header>
      <WorkoutList />
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));

export default YoursWorkoutsSection;
