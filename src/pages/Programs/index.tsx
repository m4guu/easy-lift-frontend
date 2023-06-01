import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { usePrograms } from "../../hooks/queryHooks/programsHooks/usePrograms";
import { usePaginatedResultItems } from "../../hooks";

import { InfiniteList } from "../../features";

import { Status } from "../../shared/enums";
import { SectionHeader, ProgramItem } from "../../components";

const ProgramsPage: React.FC = () => {
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    data: infinityPrograms,
  } = usePrograms();

  //! REFACTORY FILTERING WHEN BACKEND WILL BE WRITTEN
  // const { updatedPrograms, filterProgramProps } = useProgramFilter(programs);

  const programs = usePaginatedResultItems(
    infinityPrograms,
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
    <Container>
      <SectionHeader>Programs</SectionHeader>
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error!</Typography>}
      {noPrograms && <Typography>There are no programs yet.</Typography>}

      {/* <FilterPanel filterHandlers={filterProgramProps} /> */}

      <Box sx={{ flex: 1 }}>
        <InfiniteList
          items={programs}
          Item={Item}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          itemSize={85}
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

export default ProgramsPage;
