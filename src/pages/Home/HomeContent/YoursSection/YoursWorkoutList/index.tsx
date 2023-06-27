import React from "react";

import { List, Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

import { useWorkouts } from "../../../../../hooks/queryHooks/workoutsHooks/useWorkouts";
import { usePaginatedResultItems } from "../../../../../hooks";
import { WorkoutQueries } from "../../../../../hooks/filters/useWorkoutFilter";
import { generateQueriesPath } from "../../../../../utils/Queries";

import { InfiniteList } from "../../../../../features";

import { QueryKey, Status } from "../../../../../shared/enums";
import { StatusBar, WorkoutItem } from "../../../../../components";

export const YourWorkoutList: React.FC<{ userId: string }> = ({ userId }) => {
  const theme = useTheme();
  const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));
  const workoutQueries: WorkoutQueries = { creator: userId };
  const queryPath = generateQueriesPath(workoutQueries);
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityUserWorkouts,
  } = useWorkouts(queryPath, QueryKey.USER_WORKOUTS);

  const workouts = usePaginatedResultItems(
    infinityUserWorkouts,
    (response) => response
  );
  const noWorkouts = status === Status.SUCCESS && workouts.length === 0;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < workouts.length;
  // Render an item or a loading indicator.
  const Item = ({
    index,
    style,
  }: {
    index: number;
    style: React.CSSProperties;
  }) => {
    return (
      <List disablePadding style={style}>
        {isItemLoaded(index) ? (
          <WorkoutItem workout={workouts[index]} />
        ) : (
          <Box>loading...</Box>
        )}
      </List>
    );
  };

  return (
    <Box sx={isBelowXl ? { height: 500 } : { flex: 1 }}>
      <InfiniteList
        items={workouts}
        Item={Item}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        itemSize={52}
      />

      <StatusBar
        status={status}
        error={error}
        noItems={noWorkouts}
        itemName="workouts"
      />
    </Box>
  );
};
