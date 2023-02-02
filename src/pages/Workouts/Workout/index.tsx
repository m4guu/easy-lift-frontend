import React from "react";

import { Box, Alert } from "@mui/material";

import { useParams } from "react-router-dom";

import { useWorkout } from "../../../hooks/queryHooks/workoutsHooks/useWorkout";

import { Status } from "../../../shared/enums";
import { SectionHeader, SectionContainer } from "../../../components";

const WorkoutPage: React.FC = () => {
  const { workoutId } = useParams();

  const { status, error, data: workout } = useWorkout(workoutId!);

  return (
    <SectionContainer>
      <SectionHeader>Workout</SectionHeader>

      {status === Status.LOADING && null}
      {status === Status.ERROR && null}
      {status === Status.SUCCESS && workout.length !== 0 && (
        <>
          <Box>WORKOUT TITLE: {workout[0].title}</Box>
          <Box>CREATOR ID: {workout[0].creator}</Box>
        </>
      )}
      {status === Status.SUCCESS && workout.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no workout with provided ID.
        </Alert>
      )}
    </SectionContainer>
  );
};

const Workout = WorkoutPage;
export default Workout;
