import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../../contexts/userContext";

import { Role } from "../../../shared/enums";

import { ExercisesProgressSection } from "./ExercisesProgresSection";
import { TrainingProgramsSection } from "./TrainingProgramsSection";
import { YoursSection } from "./YoursSection";

export const HomeContent: React.FC = () => {
  const { user } = useUserContext();

  return (
    <HomeContainer>
      <TrainingProgramsSection />

      <Wrapper>
        {user?.role === Role.user && <ExercisesProgressSection />}
        <YoursSection />
      </Wrapper>
    </HomeContainer>
  );
};

const HomeContainer = styled(Box)({
  height: "100%",
});

const Wrapper = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "flex",
  },
}));
