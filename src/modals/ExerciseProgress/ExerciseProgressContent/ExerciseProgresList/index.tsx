import React from "react";

import { Box, Divider, List } from "@mui/material";

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
            <Divider />
          </Box>
        );
      })}
    </List>
  );
};
