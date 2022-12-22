import React from "react";

import { styled } from "@mui/system";

import ExercisesProgresSection from "./ExercisesProgresSection";
import TrainingProgramsSection from "./TrainingProgramsSection";
import YoursTrainingSection from "./YoursTrainingSection";

const HomeContent: React.FC = () => {
  return (
    <HomeContentSection>
      HOME CONTENT
      <ExercisesProgresSection />
      <TrainingProgramsSection />
      <YoursTrainingSection />
    </HomeContentSection>
  );
};

const HomeContentSection = styled("section")(({ theme }) => ({
  background: theme.palette.secondary.main,
  height: "100%",
}));

export default HomeContent;
