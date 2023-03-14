import React from "react";

import { Box, Divider, List } from "@mui/material";
import { styled } from "@mui/system";

import { UserProgres } from "../../../../shared/interfaces";

import { ExerciseProgresItem } from "../../../../components";

type ExerciseProgresListProps = {
  exerciseProgress: UserProgres[];
};

export const ExerciseProgresList: React.FC<ExerciseProgresListProps> = ({
  exerciseProgress,
}) => {
  return (
    <List>
      {exerciseProgress.map((exerciseProgres) => {
        return (
          <Box key={exerciseProgres.id}>
            <ExerciseProgresItem exerciseProgres={exerciseProgres} />
            <NoPaddingDivider />
          </Box>
        );
      })}
    </List>
  );
};

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
}));
