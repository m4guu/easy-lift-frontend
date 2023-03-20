import React from "react";

import { Divider, Box, Typography, List } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";
import { useUserWorkouts } from "../../hooks/queryHooks/workoutsHooks/useUserWorkouts";
import { useWorkoutFilter } from "../../hooks/filters/useWorkoutFilter";

import { Status } from "../../shared/enums";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { WorkoutItem, SectionHeader, SectionContainer } from "../../components";

const WorkoutsPage: React.FC = () => {
  const { user } = useUserContext();
  const { status, error, data: userWorkouts } = useUserWorkouts(user?.id);

  const { updatedWorkouts, filterPanelProps } = useWorkoutFilter(userWorkouts);

  return (
    <SectionContainer>
      <SectionHeader>Your Workouts</SectionHeader>
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>loading...</div>}

      <FilterPanel filterHandlers={filterPanelProps} />

      <WorkoutList disablePadding>
        <NoPaddingDivider />
        {updatedWorkouts.length === 0 ? (
          <Typography>No search result</Typography>
        ) : (
          updatedWorkouts.map((userWorkout) => {
            return (
              <Box key={userWorkout.id}>
                <NoPaddingDivider />
                <WorkoutItem workout={userWorkout} />
              </Box>
            );
          })
        )}
      </WorkoutList>
    </SectionContainer>
  );
};

const WorkoutList = styled(List)({
  display: "flex",
  flexDirection: "column-reverse",
});

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
}));

const Workouts = WorkoutsPage;
export default Workouts;
