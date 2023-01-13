import React from "react";

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

const HomeContainer = styled("div")({
  height: "100%",
});

const Wrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    height: "60%",
    display: "flex",
  },
}));

export default HomeContent;
