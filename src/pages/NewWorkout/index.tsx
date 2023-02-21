import React from "react";
import { FieldValues, UseFieldArrayUpdate } from "react-hook-form";

import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { Role } from "../../shared/enums";
import { AddWorkout } from "./views/AddWorkout/AddWorkout";
import { SectionHeader } from "../../components";

type NewWorkoutPageProps = {
  workoutIndex?: number;
  updateWorkoutField?: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
};

const NewWorkoutPage: React.FC<NewWorkoutPageProps> = ({
  workoutIndex,
  updateWorkoutField,
}) => {
  const { user } = useUserContext();
  const isTrainer = user?.role === Role.trainer;

  return (
    <SectionContainer sx={{ p: isTrainer ? 0 : 2 }}>
      {!isTrainer && <SectionHeader>New Workout</SectionHeader>}
      <AddWorkout
        workoutIndex={workoutIndex}
        updateWorkoutField={updateWorkoutField}
      />
    </SectionContainer>
  );
};

const SectionContainer = styled("section")({});

const NewWorkout = NewWorkoutPage;
export default NewWorkout;
