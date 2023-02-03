import React from "react";

import { Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";
import { useUserWorkouts } from "../../hooks/queryHooks/workoutsHooks/useUserWorkouts";

import { Status } from "../../shared/enums";
import { WorkoutItem, SectionHeader, SectionContainer } from "../../components";

const WorkoutsPage: React.FC = () => {
  const { user } = useUserContext();
  const { status, error, data: userWorkouts } = useUserWorkouts(user?.id);

  return (
    <SectionContainer>
      <SectionHeader>Your Workouts</SectionHeader>
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>loading...</div>}

      <WorkoutsList>
        {userWorkouts?.map((userWorkout) => {
          return (
            <>
              <WorkoutItem key={userWorkout.id} workout={userWorkout} />
              <Divider />
            </>
          );
        })}
      </WorkoutsList>
    </SectionContainer>
  );
};

const WorkoutsList = styled("ul")({
  padding: 0,
});

const Workouts = WorkoutsPage;
export default Workouts;
