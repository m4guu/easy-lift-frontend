import React from "react";

import { Link } from "react-router-dom";

import { ListItem, Typography, Box, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useDeleteWorkoutMutation } from "../../hooks/queryHooks/workoutsHooks/useDeleteWorkoutMutation";
import { useUpdateWorkoutMutation } from "../../hooks/queryHooks/workoutsHooks/useUpdateWorkouteMutation";

import { Workout } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";
import { useDeleteUserProgresMutation } from "../../hooks/queryHooks/userProgressHooks/useDeleteUserProgressMutation";

type WorkoutItemProps = {
  workout: Workout;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const theme = useTheme();
  const { mutate: deleteQueryWorkout } = useDeleteWorkoutMutation(workout.id);
  const { mutate: deleteQueryUserProgress } = useDeleteUserProgresMutation();
  const { mutate: updateQueryWorkout } = useUpdateWorkoutMutation(workout.id);

  // todo: change when backend will be written => delete user progress will be in delete workout route
  const deleteWorkout = () => {
    deleteQueryWorkout(workout.id);
    deleteQueryUserProgress(workout.id);
  };

  const updateWorkout = () => {
    const updatedWorkout = {
      ...workout,
      title: "Updated Title Workout",
    };

    updateQueryWorkout(updatedWorkout);
  };

  return (
    <WorkoutListItem disablePadding>
      <ListItemLink to={`${PATHS.WORKOUTS}/${workout.id}`}>
        <Box>
          <Typography variant="h3" color="primary">
            {workout.title}
          </Typography>
          <Typography variant="caption" color={theme.palette.text.secondary}>
            {workout.date}
          </Typography>
        </Box>
      </ListItemLink>
      <Button
        onClick={updateWorkout}
        sx={{ marginRight: "1rem" }}
        variant="outlined"
        size="small"
        color="info"
      >
        update
      </Button>
      <Button
        onClick={deleteWorkout}
        variant="outlined"
        size="small"
        color="error"
      >
        delete
      </Button>
    </WorkoutListItem>
  );
};

const WorkoutListItem = styled(ListItem)(({ theme }) => ({}));

const ListItemLink = styled(Link)(({ theme }) => ({
  width: "100%",
  padding: `${theme.spacing(1)} 0`,
  textDecoration: "none",
  borderRadius: theme.spacing(1),
}));
export default WorkoutItem;
