import React from "react";

import { Box } from "@mui/material";

import { usePaginatedResultItems } from "../../../../../hooks";
import { usePrograms } from "../../../../../hooks/queryHooks/programsHooks/usePrograms";

import { generateQueriesPath } from "../../../../../utils/Queries";

import { InfiniteList } from "../../../../../features";
import { ProgramItem, StatusBar } from "../../../../../components";

import {
  SegmentTitle,
  NoPaddingDivider,
  ProgramsContainer,
} from "./styles/TrainerViews.styles";
import { Status } from "../../../../../shared/enums";
import { ProgramQueries } from "../../../../../hooks/filters/useProgramFilter";

export const TrainerPrograms: React.FC<{ trainerId: string }> = ({
  trainerId,
}) => {
  const programQueries: ProgramQueries = { creator: trainerId };
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityTrainerPrograms,
  } = usePrograms(generateQueriesPath(programQueries));

  const programs = usePaginatedResultItems(
    infinityTrainerPrograms,
    (response) => response
  );
  const noPrograms = status === Status.SUCCESS && programs.length === 0;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index: number) =>
    !hasNextPage || index < programs.length;
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
          <ProgramItem program={programs[index]} />
        ) : (
          <Box>loading...</Box>
        )}
      </Box>
    );
  };

  return (
    <ProgramsContainer>
      <SegmentTitle variant="caption" color="primary">
        trainer programs
      </SegmentTitle>
      <NoPaddingDivider />
      <Box sx={{ height: 600 }}>
        <InfiniteList
          items={programs}
          Item={Item}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          itemSize={85}
        />
      </Box>
      <StatusBar
        status={status}
        error={error}
        noItems={noPrograms}
        itemName="programs"
      />
      <NoPaddingDivider />
    </ProgramsContainer>
  );
};
