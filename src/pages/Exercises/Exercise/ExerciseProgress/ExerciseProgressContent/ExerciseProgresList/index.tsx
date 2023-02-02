import React from "react";

import { Divider, List } from "@mui/material";

import { UserProgres } from "../../../../../../shared/interfaces";

import { ExerciseProgresItem } from "../../../../../../components";

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
          <>
            <ExerciseProgresItem
              key={exerciseProgres.id}
              exerciseProgres={exerciseProgres}
            />
            <Divider />
          </>
        );
      })}
    </List>
  );
};
