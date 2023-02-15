import React from "react";

import { AddWorkout } from "./views/AddWorkout/AddWorkout";
import { SectionHeader, SectionContainer } from "../../components";

const NewWorkoutPage: React.FC = () => {
  return (
    <SectionContainer>
      <SectionHeader>New Workout</SectionHeader>

      <AddWorkout />
    </SectionContainer>
  );
};

const NewWorkout = NewWorkoutPage;
export default NewWorkout;
