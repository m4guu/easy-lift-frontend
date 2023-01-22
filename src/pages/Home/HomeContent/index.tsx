import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { useGetUserRole } from "../../../store/redux-store/slices/user/user.hooks";

import { Role } from "../../../shared/enums";

import { ExercisesProgressSection } from "./ExercisesProgresSection";
import { TrainingProgramsSection } from "./TrainingProgramsSection";
import { YoursSection } from "./YoursSection";

export const HomeContent: React.FC = () => {
  const { role } = useGetUserRole();

  return (
    <HomeContainer>
      <TrainingProgramsSection />
      <Wrapper>
        {role === Role.user && <ExercisesProgressSection />}
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
    height: "60%",
    display: "flex",
  },
}));
