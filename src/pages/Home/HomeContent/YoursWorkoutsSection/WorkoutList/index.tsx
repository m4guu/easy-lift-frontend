import React from "react";

import { List, Alert } from "@mui/material";

import { useGetUserWorkouts } from "../../../../../store/redux-store/slices/user/user.hooks";

import { WorkoutItem } from "../../../../../components";

const TrainingList: React.FC = () => {
  const { workouts } = useGetUserWorkouts();

  return (
    <List>
      {workouts?.map((workout) => {
        return <WorkoutItem key={workout.id} workout={workout} />;
      })}
      {workouts?.length ? null : (
        <Alert variant="outlined" severity="info">
          There are no training workouts yet.
        </Alert>
      )}
    </List>
  );
};

export default TrainingList;
