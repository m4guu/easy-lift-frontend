import React from "react";

import { Link } from "react-router-dom";

import { ListItem, Typography, Box, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useMutation, useQueryClient } from "react-query";

import WorkoutsService from "../../services/WorkoutsService";

import { Workout } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

type WorkoutItemProps = {
  workout: Workout;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const queryClient = useQueryClient();
  const theme = useTheme();

  const deleteWorkoutMutation = useMutation(WorkoutsService.delete, {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries("workouts");
    },
  });

  const deleteWorkout = () => {
    deleteWorkoutMutation.mutate(workout.id);
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
        onClick={deleteWorkout}
        sx={{ position: "absolute", right: 15 }}
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
