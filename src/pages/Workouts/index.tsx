import React from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList } from "react-window";

import { Box, Divider, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";
import { useUserWorkouts } from "../../hooks/queryHooks/workoutsHooks/useUserWorkouts";
import { useWorkoutFilter } from "../../hooks/filters/useWorkoutFilter";
import { usePaginatedResultItems } from "../../hooks";

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

  // if there are more items to be loaded then add an extra row to hold a loading indicator
  const workoutsCount = hasNextPage ? workouts.length + 1 : workouts.length;
  const loadMoreWorkouts = isFetchingNextPage ? () => {} : fetchNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < workouts.length;
  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
    } else {
      content = <WorkoutItem workout={workouts[index]} />;
    }

    return <div style={style}>{content}</div>;
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
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={workoutsCount}
              loadMoreItems={loadMoreWorkouts}
            >
              {({ onItemsRendered, ref }) => (
                <InfiniteList
                  height={height}
                  width={width}
                  itemCount={workoutsCount}
                  itemSize={50}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                >
                  {Item}
                </InfiniteList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
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
const InfiniteList = styled(FixedSizeList)(({ theme }) => ({
  // Add custom scrollbar styles
  "::-webkit-scrollbar": {
    width: "4px",
    height: "4px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "8px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
  },
}));

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
}));

const Workouts = WorkoutsPage;
export default Workouts;

// workouts.map((workout) => {
//   return (
//     <List disablePadding key={workout.id}>
//       <NoPaddingDivider />
//       <WorkoutItem workout={workout} />
//     </List>
//   );
// })
