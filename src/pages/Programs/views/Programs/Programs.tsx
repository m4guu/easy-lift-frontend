import React from "react";

import { Box, Typography, List, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useProgramFilter } from "../../../../hooks/filters/useProgramFilter";

import { Program } from "../../../../shared/interfaces";
import { FilterPanel } from "../FilterPanel/FilterPanel";
import { ProgramItem } from "../../../../components";

interface ProgramsProps {
  programs: Program[];
}

export const Programs: React.FC<ProgramsProps> = ({ programs }) => {
  const { updatedPrograms, filterProgramProps } = useProgramFilter(programs);

  return (
    <Box>
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
    </Box>
  );
};

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
}));
