import React from "react";
import { FieldValues, UseFieldArrayUpdate } from "react-hook-form";
import { useParams } from "react-router-dom";

import { Box, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { Role, Status } from "../../shared/enums";
import { WorkoutFormProvider } from "./views/WorkoutFormProvider/WorkoutFormProvider";
import { SectionHeader } from "../../components";
import { useWorkout } from "../../hooks/queryHooks/workoutsHooks/useWorkout";

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
  const { workoutId: editWorkoutId } = useParams();
  const { status, error, data: editWorkout } = useWorkout(editWorkoutId);

  const { user } = useUserContext();
  const isTrainer = user?.role === Role.trainer;

  return (
    <SectionContainer sx={{ p: isTrainer ? 0 : 2 }}>
      {!isTrainer && <SectionHeader>New Workout</SectionHeader>}
      {editWorkoutId &&
      status === Status.SUCCESS &&
      editWorkout?.length === 0 ? (
        <Alert variant="outlined" severity="info">
          There are no workout with provided id. Try again later.
        </Alert>
      ) : (
        <Box>
          {status !== Status.LOADING && (
            <WorkoutFormProvider
              workoutIndex={workoutIndex}
              updateWorkoutField={updateWorkoutField}
              editWorkout={editWorkout}
            />
          )}
        </Box>
      )}
      {status === Status.LOADING && <Box>loading...</Box>}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")({
  position: "relative",
});

const NewWorkout = NewWorkoutPage;
export default NewWorkout;
