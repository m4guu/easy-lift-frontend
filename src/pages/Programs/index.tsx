import { useEffect } from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { usePrograms } from "../../hooks/queryHooks/programsHooks/usePrograms";
import { usePaginatedResultItems } from "../../hooks";
import {
  ProgramQueries,
  useProgramFilter,
} from "../../hooks/filters/useProgramFilter";

import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { InfiniteList } from "../../features";

import { Status } from "../../shared/enums";
import { SectionHeader, ProgramItem } from "../../components";
import { generateQueriesPath } from "../../utils/Queries";

const ProgramsPage: React.FC = () => {
  const { filterProgramProps, programQueries } = useProgramFilter();
  const queryPath = generateQueriesPath(programQueries);
  const {
    status,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch: refetchPrograms,
    data: infinityPrograms,
  } = usePrograms(queryPath);

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

  useEffect(() => {
    refetchPrograms();
  }, [refetchPrograms, filterProgramProps]);

  return (
    <Container>
      <SectionHeader>Programs</SectionHeader>
      <FilterPanel filterHandlers={filterProgramProps} />
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

      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error!</Typography>}
      {noPrograms && <Typography>There are no programs yet.</Typography>}
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
