import React from "react";

import { Box, Typography, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { useParams } from "react-router-dom";

import { useQuery } from "react-query";

import WorkoutsService from "../../../services/WorkoutsService";
import { Workout as WorkoutType } from "../../../shared/interfaces";

const WorkoutPage: React.FC = () => {
  const { workoutId } = useParams();
  const {
    status,
    error,
    data: workout,
  } = useQuery(["workout"], () => WorkoutsService.getWorkoutById(workoutId));

  return (
    <WorkoutContainer>
      <WorkoutHeader>
        <Typography variant="caption">Workout</Typography>
      </WorkoutHeader>
      {status === "loading" && null}
      {status === "error" && null}
      {status === "success" && workout.length !== 0 && (
        <>
          <Box>WORKOUT TITLE: {workout[0].title}</Box>
          <Box>CREATOR ID: {workout[0].creator}</Box>
        </>
      )}
      {status === "success" && workout.length === 0 && (
        <Alert variant="outlined" severity="info">
          There is no workout with provided ID.
        </Alert>
      )}
    </WorkoutContainer>
  );
};

const WorkoutContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const WorkoutHeader = styled("header")({});

const Workout = WorkoutPage;
export default Workout;
