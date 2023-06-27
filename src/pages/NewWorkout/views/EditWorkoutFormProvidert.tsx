import React from "react";

import { Box } from "@mui/material";

import { useWorkout } from "../../../hooks/queryHooks/workoutsHooks/useWorkout";

import { WorkoutFormProvider } from "./WorkoutFormProvider/WorkoutFormProvider";
import { StatusBar } from "../../../components";

export const EditWorkoutFormProvider: React.FC<{
  editWorkoutId: string;
}> = ({ editWorkoutId }) => {
  const { status, error, data: editWorkout } = useWorkout(editWorkoutId);

  return (
    <Box>
      {editWorkout && <WorkoutFormProvider editWorkout={editWorkout} />}
      <StatusBar status={status} error={error} />
    </Box>
  );
};
