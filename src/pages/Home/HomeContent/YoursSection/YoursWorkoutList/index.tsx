import React from "react";

import { List, Box, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";

import { useUserWorkouts } from "../../../../../hooks/queryHooks/workoutsHooks/useUserWorkouts";
import { usePaginatedResultItems } from "../../../../../hooks";

import { InfiniteList } from "../../../../../features";

import { Status } from "../../../../../shared/enums";
import { WorkoutItem } from "../../../../../components";

export const YourWorkoutList: React.FC<{ userId: string }> = ({ userId }) => {
  const theme = useTheme();
  const isBelowXl = useMediaQuery(theme.breakpoints.down("xl"));

  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityUserWorkouts,
  } = useUserWorkouts(userId);

  const workouts = usePaginatedResultItems(
    infinityUserWorkouts,
    (response) => response
  );
  const noWorkouts = status === Status.SUCCESS && workouts.length === 0;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < workouts.length;
  // Render an item or a loading indicator.
  const Item = ({ index, style }: { index: number; style: any }) => {
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
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}
      {noWorkouts && <Typography>You dont have any workouts yet.</Typography>}

      <InfiniteList
        items={workouts}
        Item={Item}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        itemSize={52}
      />
    </Box>
  );
};
