import React from "react";
import { FieldValues, UseFieldArrayUpdate } from "react-hook-form";

import { ListItem, Typography } from "@mui/material";
import { styled } from "@mui/system";

import NewWorkout from "../../../../../../../../NewWorkout";

type WorkoutListItemProps = {
  workoutIndex: number;
  updateWorkoutField: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
};

export const WorkoutListItem: React.FC<WorkoutListItemProps> = ({
  workoutIndex,
  updateWorkoutField,
}) => {
  return (
    <WorkoutItem>
      <Typography color="grey" variant="h3">
        Trening #{workoutIndex + 1}
      </Typography>

      <NewWorkout
        workoutIndex={workoutIndex}
        updateWorkoutField={updateWorkoutField}
      />
    </WorkoutItem>
  );
};

const WorkoutItem = styled(ListItem)({
  display: "list-item",
});
