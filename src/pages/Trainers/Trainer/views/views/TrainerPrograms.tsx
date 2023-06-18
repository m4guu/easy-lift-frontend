import React from "react";

import { Box, Alert, Typography } from "@mui/material";

import { useTrainerPrograms } from "../../../../../hooks/queryHooks/programsHooks/useTrainerPrograms";
import { usePaginatedResultItems } from "../../../../../hooks";

import { Status } from "../../../../../shared/enums";
import {
  SegmentTitle,
  NoPaddingDivider,
  ProgramsContainer,
} from "./styles/TrainerViews.styles";
import { InfiniteList } from "../../../../../features";
import { ProgramItem } from "../../../../../components";

export const TrainerPrograms: React.FC<{ trainerId: string }> = ({
  trainerId,
}) => {
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityTrainerPrograms,
  } = useTrainerPrograms(trainerId);

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
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}
      {noPrograms && <Typography>There are no programs yet.</Typography>}

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

      <NoPaddingDivider />
    </ProgramsContainer>
  );
};
