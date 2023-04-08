import React from "react";

import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";
import { useUserWorkouts } from "../../hooks/queryHooks/workoutsHooks/useUserWorkouts";
import { useWorkoutFilter } from "../../hooks/filters/useWorkoutFilter";
import { usePaginatedResultItems } from "../../hooks";

import { InfiniteList } from "../../features";

import { Status } from "../../shared/enums";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { WorkoutItem, SectionHeader } from "../../components";

const WorkoutsPage: React.FC = () => {
  const { user } = useUserContext();
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityUserWorkouts,
  } = useUserWorkouts(user?.id);

  //! REFACTORY FILTERING WHEN BACKEND WILL BE WRITTEN
  // const { updatedWorkouts, filterPanelProps } = useWorkoutFilter(userWorkouts);

  const workouts = usePaginatedResultItems(
    infinityUserWorkouts,
    (response) => response
  );
  const noWorkouts = status === Status.SUCCESS && workouts.length === 0;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < workouts.length;
  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    return (
      <Box style={style}>
        {isItemLoaded(index) ? (
          <WorkoutItem workout={workouts[index]} />
        ) : (
          <Box>loading...</Box>
        )}
      </Box>
    );
  };

  return (
    <Container>
      <SectionHeader>Your userWorkouts</SectionHeader>

      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}
      {noWorkouts && <Typography>You dont have any workouts yet.</Typography>}

      {/* <FilterPanel filterHandlers={filterPanelProps} /> */}

      <Box sx={{ flex: 1 }}>
        <NoPaddingDivider />
        <InfiniteList
          items={workouts}
          Item={Item}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          itemSize={52}
        />
      </Box>
    </Container>
  );
};

const Container = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  height: "100%",
}));

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(0.9)} -${theme.spacing(2)}`,
}));

const Workouts = WorkoutsPage;
export default Workouts;
