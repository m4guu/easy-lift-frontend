import React from "react";

import { Divider, Box, Typography, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useTrainers } from "../../hooks/queryHooks/userHooks/useTrainers";
import { usePaginatedResultItems } from "../../hooks";
import { useTrainerFilter } from "../../hooks/filters/useTrainerFilter";

import { InfiniteList } from "../../features";

import { Status } from "../../shared/enums";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { TrainerItem, SectionHeader } from "../../components";

const TrainersPage: React.FC = () => {
  const theme = useTheme();
  const isBelowSm = useMediaQuery(theme.breakpoints.down("sm"));

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
  const itemSize = isBelowSm ? 58 : 78;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < trainers.length;
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

      {status === Status.LOADING && <Typography>Loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}
      {noTrainers && <Typography>There are no trainers yet.</Typography>}

      {/* <FilterPanel filterHandlers={filterPanelProps} /> */}
      <Box sx={{ flex: 1 }}>
        <InfiniteList
          items={trainers}
          Item={Item}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          itemSize={itemSize}
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
