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

  const deleteWorkout = () => {
    deleteQueryWorkout(workout.id);
    deleteQueryUserProgress(workout.id);
  };

  const updateWorkout = () => {
    const updateData = {
      ...workout,
      title: "Updated Title Workout",
    };

    updateQueryWorkout(updateData);
  };

  return (
    <WorkoutListItem disablePadding>
      <ListItemLink to={`${PATHS.WORKOUTS}/${workout.id}`}>
        <Box>
          <Typography variant="subtitle1" color="primary">
            {workout.title}
          </Typography>
          <Typography variant="h3" color={theme.palette.text.primary}>
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

const WorkoutListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const ListItemLink = styled(Link)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1),
  textDecoration: "none",
  borderRadius: theme.spacing(1),
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
}));
export default WorkoutItem;
