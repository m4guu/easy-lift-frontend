import React from "react";

import { Box, Typography } from "@mui/material";

import { usePrograms } from "../../../../../hooks/queryHooks/programsHooks/usePrograms";

import { usePaginatedResultItems } from "../../../../../hooks";

import { ProgramItem } from "../../../../../components";
import { InfiniteList } from "../../../../../features";

import { QueryKey, Status } from "../../../../../shared/enums";
import { generateProgramQueriesPath } from "../../../../../utils/Queries";

export const YoursProgramsList: React.FC<{ userId: string }> = ({ userId }) => {
  const queryPath = generateProgramQueriesPath({ creator: userId });

  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityTrainerPrograms,
  } = usePrograms(queryPath, QueryKey.TRAINER_PROGRAMS);

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
    <Box sx={{ height: 500 }}>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}
      {noPrograms && <Typography>There are no programs yet.</Typography>}
      <InfiniteList
        items={programs}
        Item={Item}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        itemSize={85}
      />
    </Box>
  );
};
