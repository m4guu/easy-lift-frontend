import React from "react";

import { ExercisesProgress } from "./ExercisesProgress";

import { SectionHeader, SectionContainer } from "../../../../components";

export const ExercisesProgressSection: React.FC = () => {
  return (
    <SectionContainer>
      <SectionHeader>exercises progress</SectionHeader>
      <ExercisesProgress />
    </SectionContainer>
  );
};
