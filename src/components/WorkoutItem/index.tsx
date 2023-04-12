import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ListItem, Typography, Box, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useDeleteUserProgresMutation } from "../../hooks/queryHooks/userProgressHooks/useDeleteUserProgressMutation";
import { useDeleteWorkoutMutation } from "../../hooks/queryHooks/workoutsHooks/useDeleteWorkoutMutation";
import { useConfirmModal } from "../../hooks/modalHooks/Confirm/useConfirmModal";
import { useSnackbar } from "../../hooks";

import { Confirm } from "../../modals";

import { SnackbarStatus, Status } from "../../shared/enums";
import { Workout } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";

type WorkoutItemProps = {
  workout: Workout;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const { open, isOpen, close } = useConfirmModal();

  const { status, mutate: deleteQueryWorkout } = useDeleteWorkoutMutation(
    workout.id
  );
  const { mutate: deleteQueryUserProgress } = useDeleteUserProgresMutation();

  // todo: change when backend will be written => delete user progress will be in delete workout route
  const deleteWorkout = () => {
    deleteQueryWorkout(workout.id);
    deleteQueryUserProgress(workout.id);
  };

  const onWorkoutChoose = () => {
    if (workout.isDraft) {
      navigate(`${PATHS.NEW_WORKOUT}/${workout.id}`);
    } else {
      navigate(`${PATHS.WORKOUTS}/${workout.id}`);
    }
  };

  useEffect(() => {
    if (status === Status.SUCCESS) {
      snackbar("Workout deleted successfully!", SnackbarStatus.SUCCESS);
    }
    if (status === Status.ERROR) {
      snackbar("Something goes wrong. Please try later.", SnackbarStatus.ERROR);
    }
  }, [snackbar, status]);

  return (
    <Item disablePadding>
      <ItemButton onClick={onWorkoutChoose}>
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
      </ItemButton>

      <DeleteButton
        onClick={open}
        variant="outlined"
        size="small"
        color="error"
      >
        delete
      </DeleteButton>

      <Confirm
        onConfirm={deleteWorkout}
        confirmTitle="delete workout"
        isOpen={isOpen}
        closeModal={close}
      />
    </Item>
  );
};

const Item = styled(ListItem)({
  position: "relative",
});

const ItemButton = styled(Button)(({ theme }) => ({
  width: "100%",
  textDecoration: "none",
  borderRadius: theme.spacing(1),
  justifyContent: "flex-start",
}));

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const DeleteButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
}));

export default WorkoutItem;
