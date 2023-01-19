import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import ExercisesProgresSection from "./ExercisesProgresSection";
import TrainingProgramsSection from "./TrainingProgramsSection";
import YoursWorkoutsSection from "./YoursWorkoutsSection";

const HomeContent: React.FC = () => {
  return (
    <HomeContainer>
      <TrainingProgramsSection />
      <Wrapper>
        <ExercisesProgresSection />
        <YoursWorkoutsSection />
      </Wrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled(Box)({
  height: "100%",
});

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    height: "60%",
    display: "flex",
  },
}));

export default HomeContent;
