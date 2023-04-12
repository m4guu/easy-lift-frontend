import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { useDeleteWorkoutMutation } from "../../../../../../hooks/queryHooks/workoutsHooks/useDeleteWorkoutMutation";
import { useDeleteUserProgresMutation } from "../../../../../../hooks/queryHooks/userProgressHooks/useDeleteUserProgressMutation";
import { useSnackbar } from "../../../../../../hooks";

import { SnackbarStatus, Status } from "../../../../../../shared/enums";
import { PATHS } from "../../../../../paths";
import { WorkoutActionsEnum } from "./constans";

import { SettingAction } from "../../../../../../components/DotsSettings";
import { DotsSettings } from "../../../../../../components";

interface WorkoutActionsProps {
  workoutId: string;
}

export const WorkoutActions: React.FC<WorkoutActionsProps> = ({
  workoutId,
}) => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const { status, mutate: deleteQueryWorkout } =
    useDeleteWorkoutMutation(workoutId);
  const { mutate: deleteQueryUserProgress } = useDeleteUserProgresMutation();

  // todo: change when backend will be written => delete user progress will be in delete workout route
  const deleteWorkout = () => {
    deleteQueryWorkout(workoutId);
    deleteQueryUserProgress(workoutId);
  };
  const editWorkout = () => {
    navigate(`${PATHS.NEW_WORKOUT}/${workoutId}`);
  };

  const actions: SettingAction[] = [
    {
      id: uuidv4(),
      name: WorkoutActionsEnum.EDIT,
      icon: <EditIcon fontSize="small" color="info" />,
      onClick: editWorkout,
    },
    {
      id: uuidv4(),
      name: WorkoutActionsEnum.DELETE,
      icon: <DeleteIcon fontSize="small" color="error" />,
      onClick: deleteWorkout,
    },
  ];

  useEffect(() => {
    if (status === Status.SUCCESS) {
      navigate(PATHS.WORKOUTS);
      snackbar("Workout deleted successfully!", SnackbarStatus.SUCCESS);
    }
    if (status === Status.ERROR) {
      snackbar("Something goes wrong. Please try later.", SnackbarStatus.ERROR);
    }
  }, [snackbar, status, navigate]);

  return (
    <Container>
      <DotsSettings actions={actions} />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
}));
