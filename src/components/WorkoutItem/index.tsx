import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

import { ListItem, Typography, Box, Button } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useDeleteUserProgresMutation } from "../../hooks/queryHooks/userProgressHooks/useDeleteUserProgressMutation";
import { useDeleteWorkoutMutation } from "../../hooks/queryHooks/workoutsHooks/useDeleteWorkoutMutation";
import { useSnackbar } from "../../hooks";

import { SnackbarStatus, Status } from "../../shared/enums";
import { Workout } from "../../shared/interfaces";
import { PATHS } from "../../pages/paths";
import ButtonWithConfirmation from "../ButtonWithConfirmation";

type WorkoutItemProps = {
  workout: Workout;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

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
        <Container>
          <Content>
            <Typography variant="h3" color="primary">
              {workout.title}
            </Typography>
            {workout.isDraft && (
              <Typography variant="caption" color="info.main">
                DRAFT
              </Typography>
            )}
          </Content>

          <Typography variant="caption" color={theme.palette.text.secondary}>
            {format(new Date(workout.date), "yyyy-MM-dd")}
          </Typography>
        </Container>
      </ItemButton>

      <DeleteButton
        onConfirm={deleteWorkout}
        variant="outlined"
        size="small"
        color="error"
      >
        delete
      </DeleteButton>
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

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
});

const Content = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(1),
}));

const DeleteButton = styled(ButtonWithConfirmation)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  right: theme.spacing(1),
  transform: "translate(0, -50%)",
}));

export default WorkoutItem;
