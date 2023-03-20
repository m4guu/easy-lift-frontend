import React from "react";

import { List, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../../../../contexts/userContext";
import { useUserWorkouts } from "../../../../../hooks/queryHooks/workoutsHooks/useUserWorkouts";

import { Status } from "../../../../../shared/enums";
import { WorkoutItem } from "../../../../../components";

export const YourWorkoutList: React.FC = () => {
  const { user } = useUserContext();
  const { status, error, data: userWorkouts } = useUserWorkouts(user?.id);

  return (
    <WorkoutList>
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
    </WorkoutList>
  );
};

const WorkoutList = styled(List)({
  display: "flex",
  flexDirection: "column-reverse",
});
