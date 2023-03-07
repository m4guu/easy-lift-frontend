import React from "react";

import { Alert, List, Divider, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { usePrograms } from "../../hooks/queryHooks/programsHooks/usePrograms";

import { Status } from "../../shared/enums";
import { ProgramItem, SectionHeader, SectionContainer } from "../../components";
import { useProgramFilter } from "../../hooks/filters/useProgramFilter";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";

const ProgramsPage: React.FC = () => {
  const { status, error, data: programs } = usePrograms();
  const { updatedPrograms, filterProgramProps } = useProgramFilter(programs);

  return (
    <SectionContainer>
      <SectionHeader>Programs</SectionHeader>
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error!</div>}

      <FilterPanel filterHandlers={filterProgramProps} />

      <List disablePadding>
        {updatedPrograms.length === 0 ? (
          <Typography>No search result</Typography>
        ) : (
          updatedPrograms.map((program) => {
            return (
              <Box key={program.id}>
                <NoPaddingDivider />
                <ProgramItem program={program} />
              </Box>
            );
          })
        )}
      </List>
      <NoPaddingDivider />

      {programs?.length === 0 && (
        <Alert variant="outlined" severity="info">
          There are no training programs yet.
        </Alert>
      )}
    </SectionContainer>
  );
};

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
}));

const Programs = ProgramsPage;
export default Programs;
