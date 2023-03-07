import React from "react";

import { Box, Alert } from "@mui/material";

import { useTrainerPrograms } from "../../../../hooks/queryHooks/programsHooks/useTrainerPrograms";

import { Status } from "../../../../shared/enums";
import {
  SegmentTitle,
  NoPaddingDivider,
  ProgramsContainer,
  ProgramList,
} from "./styles/TrainerViews.styles";
import { ProgramItem } from "../../../../components";

interface TrainerProgramsProps {
  trainerId: string | undefined;
}

export const TrainerPrograms: React.FC<TrainerProgramsProps> = ({
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
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}
      {status === Status.SUCCESS && trainerPrograms.length !== 0 ? (
        <ProgramList disablePadding>
          {trainerPrograms.map((program) => {
            return (
              <Box>
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
