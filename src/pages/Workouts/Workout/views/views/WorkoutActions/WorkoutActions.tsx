import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

import { useDeleteWorkoutMutation } from "../../../../../../hooks/queryHooks/workoutsHooks/useDeleteWorkoutMutation";
import { useSnackbar } from "../../../../../../hooks";

import { SnackbarStatus, Status } from "../../../../../../shared/enums";
import { PATHS } from "../../../../../paths";

import { ButtonWithConfirmation } from "../../../../../../components";

interface WorkoutActionsProps {
  workoutId: string;
}

export const WorkoutActions: React.FC<WorkoutActionsProps> = ({
  workoutId,
}) => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const {
    error,
    status,
    mutate: deleteQueryWorkout,
  } = useDeleteWorkoutMutation(workoutId);

  const editWorkout = () => {
    navigate(`${PATHS.NEW_WORKOUT}/${workoutId}`);
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate(PATHS.WORKOUTS);
      snackbar("Workout deleted successfully!", SnackbarStatus.SUCCESS);
    }
    if (status === Status.ERROR && error) {
      snackbar(error.message, SnackbarStatus.ERROR);
    }
  }, [snackbar, status, navigate, error]);

  return (
    <Container>
      <Button
        onClick={editWorkout}
        variant="outlined"
        size="small"
        color="info"
      >
        edit
      </Button>
      <ButtonWithConfirmation
        onConfirm={() => deleteQueryWorkout(workoutId)}
        variant="outlined"
        size="small"
        color="error"
      >
        delete
      </ButtonWithConfirmation>
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  gap: theme.spacing(1),
  top: theme.spacing(2),
  right: theme.spacing(2),
}));
