import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Menu, MenuItem, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDeleteWorkoutMutation } from "../../../../../hooks/queryHooks/workoutsHooks/useDeleteWorkoutMutation";
import { useDeleteUserProgresMutation } from "../../../../../hooks/queryHooks/userProgressHooks/useDeleteUserProgressMutation";

import { PATHS } from "../../../../paths";
import { actions, WorkoutActionsEnum } from "./constans";

interface WorkoutActionsProps {
  workoutId: string;
}

// todo: add funcionality to actions --> delete & edit
export const WorkoutActions: React.FC<WorkoutActionsProps> = ({
  workoutId,
}) => {
  const navigate = useNavigate();

  const { mutate: deleteQueryWorkout } = useDeleteWorkoutMutation(workoutId);
  const { mutate: deleteQueryUserProgress } = useDeleteUserProgresMutation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // todo: change when backend will be written => delete user progress will be in delete workout route
  const deleteWorkout = () => {
    deleteQueryWorkout(workoutId);
    deleteQueryUserProgress(workoutId);
  };

  const handleAction = (actionName: WorkoutActionsEnum) => {
    setAnchorEl(null);
    if (actionName === WorkoutActionsEnum.DELETE) {
      deleteWorkout();
      navigate(PATHS.WORKOUTS);
    } else if (actionName === WorkoutActionsEnum.EDIT) {
      // edit workout
    }
  };

  return (
    <Settings>
      <IconButton color="primary" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {actions.map((action) => (
          <Item key={action.id} onClick={() => handleAction(action.name)}>
            <ActionName
              color={
                action.name === WorkoutActionsEnum.DELETE
                  ? "error"
                  : "info.main"
              }
            >
              {action.name}
            </ActionName>
            {action.icon}
          </Item>
        ))}
      </Menu>
    </Settings>
  );
};

const Settings = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: theme.spacing(2),
}));

const Item = styled(MenuItem)({
  display: "flex",
  justifyContent: "space-between",
  minWidth: "7rem",
});

const ActionName = styled(Typography)({
  textTransform: "capitalize",
});
