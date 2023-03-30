import React from "react";

import { Link } from "react-router-dom";

import { ListItem, Typography, Box, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useDeleteWorkoutMutation } from "../../hooks/queryHooks/workoutsHooks/useDeleteWorkoutMutation";

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

  // todo: change when backend will be written => delete user progress will be in delete workout route
  const deleteWorkout = () => {
    deleteQueryWorkout(workout.id);
    deleteQueryUserProgress(workout.id);
  };

  return (
    <ListItem disablePadding>
      <ListItemLink
        // todo: add edit path (on next branch feat/add-edits)
        to={
          workout.isDraft
            ? `${PATHS.NEW_WORKOUT}/${workout.id}`
            : `${PATHS.WORKOUTS}/${workout.id}`
        }
      >
        <Box>
          <Container>
            <Typography variant="h3" color="primary">
              {workout.title}
            </Typography>
            {workout.isDraft && (
              <Typography variant="caption" color="info.main">
                DRAFT
              </Typography>
            )}
          </Container>

          <Typography variant="caption" color={theme.palette.text.secondary}>
            {workout.date}
          </Typography>
        </Box>
      </ListItemLink>

      <Button
        onClick={deleteWorkout}
        variant="outlined"
        size="small"
        color="error"
      >
        delete
      </Button>
    </ListItem>
  );
};

const ListItemLink = styled(Link)(({ theme }) => ({
  width: "100%",
  padding: `${theme.spacing(1)} 0`,
  textDecoration: "none",
  borderRadius: theme.spacing(1),
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

export default WorkoutItem;
