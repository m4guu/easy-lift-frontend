import React from "react";

import { List, Divider, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useTrainers } from "../../hooks/queryHooks/userHooks/useTrainers";
import { usePaginatedResultItems } from "../../hooks";
import { useTrainerFilter } from "../../hooks/filters/useTrainerFilter";

import { InfiniteList } from "../../features";

import { Status } from "../../shared/enums";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { TrainerItem, SectionHeader, SectionContainer } from "../../components";

const TrainersPage: React.FC = () => {
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityTrainers,
  } = useTrainers();

  //! REFACTORY FILTERING WHEN BACKEND WILL BE WRITTEN
  // const { updatedList, filterPanelProps } = useTrainerFilter(trainers);

  const trainers = usePaginatedResultItems(
    infinityTrainers,
    (response) => response
  );
  const noTrainers = status === Status.SUCCESS && trainers.length === 0;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < trainers.length;
  // Render an item or a loading indicator.
  const Item = ({ index, style }) => {
    return (
      <Box style={style}>
        {isItemLoaded(index) ? (
          <Box>
            <Divider />
            <TrainerItem trainer={trainers[index]} />
          </Box>
        ) : (
          <Box>loading...</Box>
        )}
      </Box>
    );
  };

  return (
    <Container>
      <SectionHeader>Our Trainers</SectionHeader>

      {status === Status.LOADING && <div>Loading...</div>}
      {status === Status.ERROR && <div>error</div>}
      {noTrainers && <Typography>There are no trainers yet.</Typography>}

      {/* <FilterPanel filterHandlers={filterPanelProps} /> */}
      <Box sx={{ flex: 1 }}>
        <InfiniteList
          items={trainers}
          Item={Item}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          itemSize={80}
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

const Trainers = TrainersPage;
export default Trainers;
