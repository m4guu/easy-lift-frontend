import React from "react";

import { Box, Alert, Typography } from "@mui/material";

import { useTrainerPrograms } from "../../../../../hooks/queryHooks/programsHooks/useTrainerPrograms";

import { Status } from "../../../../../shared/enums";
import {
  SegmentTitle,
  NoPaddingDivider,
  ProgramsContainer,
  ProgramList,
} from "./styles/TrainerViews.styles";
import { ProgramItem } from "../../../../../components";

export const TrainerPrograms: React.FC<{ trainerId: string }> = ({
  trainerId,
}) => {
  const {
    status,
    error,
    data: trainerPrograms,
  } = useTrainerPrograms(trainerId);

  return (
    <ProgramsContainer>
      <SegmentTitle variant="caption" color="primary">
        trainer programs
      </SegmentTitle>
      <NoPaddingDivider />
      {status === Status.LOADING && <Typography>loading...</Typography>}
      {status === Status.ERROR && <Typography>error</Typography>}
      {status === Status.SUCCESS && trainerPrograms.length !== 0 ? (
        <ProgramList disablePadding>
          {trainerPrograms.map((program) => {
            return (
              <Box key={program.id}>
                <NoPaddingDivider />
                <ProgramItem program={program} />
              </Box>
            );
          })}
        </ProgramList>
      ) : (
        <Alert variant="outlined" severity="info">
          Trainer dont have programs yet.
        </Alert>
      )}
      <NoPaddingDivider />
    </ProgramsContainer>
  );
};
