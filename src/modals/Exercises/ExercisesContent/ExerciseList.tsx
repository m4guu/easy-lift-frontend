import React from "react";

import { List } from "@mui/material";

import { Exercise } from "../../../shared/interfaces";
import { ExerciseItem } from "../../../components";

type ExerciseListProps = {
  exercises: Exercise[];
  appendExercise: any;
  closeModal: () => void;
};

export const ExerciseList: React.FC<ExerciseListProps> = ({
  exercises,
  appendExercise,
  closeModal,
}) => {
  return (
    <List>
      {exercises?.map((exercise) => {
        return (
          <ExerciseItem
            key={exercise.id}
            exercise={exercise}
            appendExercise={appendExercise}
            closeModal={closeModal}
          />
        );
      })}
    </List>
  );
};
