import React from "react";

import { Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useUserWorkouts } from "../../hooks/queryHooks/workoutsHooks/useUserWorkouts";

import { useGetUserId } from "../../store/redux-store/slices/user/user.hooks";

import { Status } from "../../shared/enums";
import { WorkoutItem, SectionHeader, SectionContainer } from "../../components";

const WorkoutsPage: React.FC = () => {
  const { id: userId } = useGetUserId();
  const { status, error, data: userWorkouts } = useUserWorkouts(userId);

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
