import React from "react";

import { List, Alert } from "@mui/material";

import { useUserWorkouts } from "../../../../../hooks/queryHooks/workoutsHooks/useUserWorkouts";
import { useGetUserId } from "../../../../../store/redux-store/slices/user/user.hooks";

import { Status } from "../../../../../shared/enums";
import { WorkoutItem } from "../../../../../components";

export const YourWorkoutList: React.FC = () => {
  const { id: userId } = useGetUserId();
  const { status, error, data: userWorkouts } = useUserWorkouts(userId);

  return (
    <List>
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}

      {userWorkouts?.map((workout) => {
        return <WorkoutItem key={workout.id} workout={workout} />;
      })}
      {userWorkouts?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There are no training workouts yet.
        </Alert>
      )}
    </List>
  );
};
