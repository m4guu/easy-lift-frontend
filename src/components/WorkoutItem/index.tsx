import React from "react";

import { ListItem, Typography, Link } from "@mui/material";
import styled from "@mui/system/styled";

import { Workout } from "../../shared/interfaces";

type WorkoutItemProps = {
  workout: Workout;
};

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout }) => {
  return (
    <WorkoutListItem disablePadding>
      <div>
        <Typography variant="subtitle1" color="primary">
          {workout.title}
        </Typography>
        <Typography variant="h3">{workout.date}</Typography>
      </div>
      <Link href="/" underline="hover">
        show details
      </Link>
    </WorkoutListItem>
  );
};

const WorkoutListItem = styled(ListItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(1),
  borderBottom: `solid thin ${theme.palette.others.border_color}`,
}));

export default WorkoutItem;
