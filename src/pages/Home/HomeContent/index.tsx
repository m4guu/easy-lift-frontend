import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { useGetUserRole } from "../../../store/redux-store/slices/user/user.hooks";

import { Role } from "../../../shared/enums";

import ExercisesProgresSection from "./ExercisesProgresSection";
import TrainingProgramsSection from "./TrainingProgramsSection";
import YoursSection from "./YoursSection";

const HomeContent: React.FC = () => {
  const { role } = useGetUserRole();

  return (
    <HomeContainer>
      <TrainingProgramsSection />
      <Wrapper>
        {role === Role.user && <ExercisesProgresSection />}
        <YoursSection />
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
