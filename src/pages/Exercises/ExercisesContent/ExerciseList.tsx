import React from "react";

import { List } from "@mui/material";

import { Exercise } from "../../../shared/interfaces";
import { ExerciseItem } from "../../../components";

type ExerciseListProps = {
  exercises: Exercise[];
};

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
  return (
    <List>
      {exercises?.map((exercise) => {
        return <ExerciseItem key={exercise.id} exercise={exercise} />;
      })}
    </List>
  );
};
