import React from "react";

import { styled } from "@mui/system";

import { ExercisesProgress } from "./ExercisesProgress";
import { SectionHeader } from "../../../../components";

export const ExercisesProgressSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionHeader>exercises progress</SectionHeader>
      <ExercisesProgress />
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  minWidth: "50%",
  padding: theme.spacing(2),
  gap: theme.spacing(2),
  [theme.breakpoints.down("xl")]: {
    minWidth: "60%",
  },
}));
