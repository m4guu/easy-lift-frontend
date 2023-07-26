import { useEffect } from "react";

import { Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useWorkouts } from "../../../hooks/queryHooks/workoutsHooks/useWorkouts";
import {
  WorkoutQueries,
  useWorkoutFilter,
} from "../../../hooks/filters/useWorkoutFilter";
import { usePaginatedResultItems } from "../../../hooks";

import { InfiniteList } from "../../../features";

import { QueryKey, Status } from "../../../shared/enums";
import { FilterPanel } from "./views/FilterPanel";
import { StatusBar, WorkoutItem } from "../../../components";
import { generateQueriesPath } from "../../../utils/Queries";

export const WorkoutsContent: React.FC<{ userId: string }> = ({ userId }) => {
  const { filterPanelProps } = useWorkoutFilter();
  const workoutQueries: WorkoutQueries = {
    creator: userId,
    name: filterPanelProps.selectedTitle,
  };
  const queryPath = generateQueriesPath(workoutQueries);

  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch: refetchWorkouts,
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
      <Box style={style}>
        {isItemLoaded(index) ? (
          <WorkoutItem workout={workouts[index]} />
        ) : (
          <Box>loading...</Box>
        )}
      </Box>
    );
  };

  useEffect(() => {
    refetchWorkouts();
  }, [refetchWorkouts, filterPanelProps.selectedTitle]);

  return (
    <Box sx={{ flex: 1 }}>
      <FilterPanel filterHandlers={filterPanelProps} />

      <NoPaddingDivider />
      <InfiniteList
        items={workouts.reverse()}
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

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(0.9)} -${theme.spacing(2)}`,
}));
