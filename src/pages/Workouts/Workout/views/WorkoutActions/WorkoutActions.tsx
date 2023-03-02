import React from "react";

import { SpeedDial, SpeedDialAction } from "@mui/material";
import { styled } from "@mui/system";
import SettingsIcon from "@mui/icons-material/Settings";

import { actions } from "./constans";

interface WorkoutActionsProps {
  workoutId: string;
}

// todo: add funcionality to actions --> delete & edit
export const WorkoutActions: React.FC<WorkoutActionsProps> = ({
  workoutId,
}) => {
  return (
    <Settings
      ariaLabel="SpeedDial openIcon example"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      icon={<SettingsIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
        />
      ))}
    </Settings>
  );
};

const Settings = styled(SpeedDial)(({ theme }) => ({
  position: "absolute",
  top: 10,
  right: theme.spacing(2),
  flexDirection: "column",
  "& .MuiFab-primary": {
    width: 43,
    height: 43,
  },
}));
