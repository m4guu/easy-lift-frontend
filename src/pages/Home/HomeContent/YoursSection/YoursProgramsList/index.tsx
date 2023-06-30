import React from "react";

import { Box } from "@mui/material";

import { usePrograms } from "../../../../../hooks/queryHooks/programsHooks/usePrograms";

import { usePaginatedResultItems } from "../../../../../hooks";

import { ProgramItem, StatusBar } from "../../../../../components";
import { InfiniteList } from "../../../../../features";

import { QueryKey, Status } from "../../../../../shared/enums";
import { generateQueriesPath } from "../../../../../utils/Queries";
import { ProgramQueries } from "../../../../../hooks/filters/useProgramFilter";

export const YoursProgramsList: React.FC<{ userId: string }> = ({ userId }) => {
  const programQueries: ProgramQueries = { creator: userId };
  const queryPath = generateQueriesPath(programQueries);

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
      <InfiniteList
        items={programs}
        Item={Item}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        itemSize={85}
      />

      <StatusBar
        status={status}
        error={error}
        noItems={noPrograms}
        itemName="programs"
      />
    </Box>
  );
};
