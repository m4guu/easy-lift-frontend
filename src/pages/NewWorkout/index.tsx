import React from "react";
import { FieldValues, UseFieldArrayUpdate } from "react-hook-form";
import { useParams } from "react-router-dom";

import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { Role } from "../../shared/enums";
import { WorkoutFormProvider } from "./views/WorkoutFormProvider/WorkoutFormProvider";
import { SectionHeader } from "../../components";
import { EditWorkoutFormProvider } from "./views/EditWorkoutFormProvidert";

type NewWorkoutPageProps = {
  workoutIndex?: number;
  updateWorkoutField?: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
};

const NewWorkout: React.FC<NewWorkoutPageProps> = ({
  workoutIndex,
  updateWorkoutField,
}) => {
  const { user } = useUserContext();
  const { workoutId: editWorkoutId } = useParams();

  const isTrainer = user?.role === Role.trainer;

  return (
    <SectionContainer sx={{ p: isTrainer ? 0 : 2 }}>
      {!isTrainer && <SectionHeader>New Workout</SectionHeader>}

      {editWorkoutId ? (
        <EditWorkoutFormProvider editWorkoutId={editWorkoutId} />
      ) : (
        <WorkoutFormProvider
          workoutIndex={workoutIndex}
          updateWorkoutField={updateWorkoutField}
        />
      )}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")({
  position: "relative",
});

export default NewWorkout;
