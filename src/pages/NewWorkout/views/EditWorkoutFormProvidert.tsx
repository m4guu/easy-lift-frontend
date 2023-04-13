import React from "react";

import { Box, Alert } from "@mui/material";

import { useWorkout } from "../../../hooks/queryHooks/workoutsHooks/useWorkout";

import { Status } from "../../../shared/enums";
import { WorkoutFormProvider } from "./WorkoutFormProvider/WorkoutFormProvider";

export const EditWorkoutFormProvider: React.FC<{
  editWorkoutId: string;
}> = ({ editWorkoutId }) => {
  const { status, error, data: editWorkout } = useWorkout(editWorkoutId);

  return (
    <Box>
      {status === Status.LOADING && <Box>loading...</Box>}
      {status === Status.ERROR && <Box>error</Box>}

      {editWorkout && editWorkout.length !== 0 ? (
        <WorkoutFormProvider editWorkout={editWorkout} />
      ) : (
        <Box>
          {status !== Status.LOADING && (
            <Alert variant="outlined" severity="info">
              There are no workout with provided id. Try again later.
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};
