import React from "react";
import { UseFieldArrayAppend } from "react-hook-form";

import { List } from "@mui/material";

import { AddWorkoutForm } from "../../../hooks/formHooks/workout/useNewWorkoutForm";
import { Exercise } from "../../../shared/interfaces";
import { ExerciseItem } from "../../../components";

type ExerciseListProps = {
  exercises: Exercise[];
  appendExercise: UseFieldArrayAppend<AddWorkoutForm, "exercises">;
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
