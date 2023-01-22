import React from "react";

import { Box, Skeleton } from "@mui/material";
import { styled } from "@mui/system";

import { useQuery } from "react-query";
import { WorkoutsService } from "../../services";

import { useGetUserId } from "../../store/redux-store/slices/user/user.hooks";

import { Workout } from "../../shared/interfaces";

import { WorkoutItem, SectionHeader, SectionContainer } from "../../components";

const WorkoutListPage: React.FC = () => {
  const { id: userId } = useGetUserId();
  const {
    status,
    error,
    data: userWorkouts,
  } = useQuery(["workouts"], () => WorkoutsService.getUserWorkouts(userId));

  return (
    <SectionContainer>
      <SectionHeader>Your Workouts</SectionHeader>
      {status === "loading" ? (
        <>
          <LoadingSkeleton variant="rectangular" height={55} />
          <LoadingSkeleton variant="rectangular" height={55} />
          <LoadingSkeleton variant="rectangular" height={55} />
        </>
      ) : (
        <WorkoutsList>
          {userWorkouts?.map((userWorkout: Workout) => {
            return <WorkoutItem key={userWorkout.id} workout={userWorkout} />;
          })}
        </WorkoutsList>
      )}
    </SectionContainer>
  );
};

const WorkoutsList = styled("ul")({
  padding: 0,
});

const LoadingSkeleton = styled(Skeleton)(({ theme }) => ({
  padding: theme.spacing(1),
  margin: `${theme.spacing(1)} 0`,
  borderRadius: theme.spacing(1),
}));
const WorkoutList = WorkoutListPage;
export default WorkoutList;
