import React from "react";

import { useQuery } from "react-query";

import { List, Alert } from "@mui/material";

import { useGetUserId } from "../../../../../store/redux-store/slices/user/user.hooks";

import WorkoutsService from "../../../../../services/WorkoutsService";

import { WorkoutItem } from "../../../../../components";
import { Workout } from "../../../../../shared/interfaces";

const YourWorkoutList: React.FC = () => {
  const { id: userId } = useGetUserId();
  const {
    status,
    error,
    data: userWorkouts,
  } = useQuery(["workouts"], () => WorkoutsService.getUserWorkouts(userId));

  return (
    <List>
      {status === "loading" && <div>loading...</div>}
      {status === "error" && <div>error</div>}

      {userWorkouts?.map((workout: Workout) => {
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

export default YourWorkoutList;
