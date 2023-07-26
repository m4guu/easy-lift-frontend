import React, { useEffect } from "react";

import { Divider, Box, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/system";

import { useTrainers } from "../../hooks/queryHooks/userHooks/useTrainers";
import { usePaginatedResultItems } from "../../hooks";
import {
  TraninerQueries,
  useTrainerFilter,
} from "../../hooks/filters/useTrainerFilter";

import { generateQueriesPath } from "../../utils/Queries";
import { InfiniteList } from "../../features";

import { Status } from "../../shared/enums";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { TrainerItem, SectionHeader, StatusBar } from "../../components";

const TrainersPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { filterPanelProps } = useTrainerFilter();
  const trainerQueries: TraninerQueries = {
    name: filterPanelProps.selectedName,
    personalTraining: filterPanelProps.selectedPersonalTraining,
  };
  const queryPath = generateQueriesPath(trainerQueries);

  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch: refetchTrainers,
    data: infinityTrainers,
  } = useTrainers(queryPath);

  const trainers = usePaginatedResultItems(
    infinityTrainers,
    (response) => response
  );
  const noTrainers = status === Status.SUCCESS && trainers.length === 0;
  const itemSize = isMobile ? 58 : 78;

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

  useEffect(() => {
    refetchTrainers();
  }, [
    filterPanelProps.selectedName,
    filterPanelProps.selectedPersonalTraining,
    refetchTrainers,
  ]);

  return (
    <Container>
      <SectionHeader>Our Trainers</SectionHeader>
      <FilterPanel filterHandlers={filterPanelProps} />
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

      <StatusBar
        status={status}
        error={error}
        noItems={noTrainers}
        itemName="trainers"
      />
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
