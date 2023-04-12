import React from "react";

import { List } from "@mui/material";
import { styled } from "@mui/system";

import { WorkoutExercise } from "../../../../../../shared/interfaces";

import { ExerciseItemWorkout } from "../../../../../../components";

interface WorkoutDetailsProps {
  exercises: WorkoutExercise[];
}

export const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({
  exercises,
}) => {
  return (
    <ExercisesList disablePadding>
      {exercises.map((exercise, i) => (
        <ExerciseItemWorkout
          key={exercise.id}
          itemIndex={i}
          name={exercise.name}
          sets={exercise.sets}
        />
      ))}
    </ExercisesList>
  );
};

const ExercisesList = styled(List)({});
