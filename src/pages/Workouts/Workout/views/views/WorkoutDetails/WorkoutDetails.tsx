import React from "react";

import { List } from "@mui/material";

import { WorkoutExercise } from "../../../../../../shared/interfaces";

import { ExerciseItemWorkout } from "../../../../../../components";

interface WorkoutDetailsProps {
  exercises: WorkoutExercise[];
}

export const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({
  exercises,
}) => {
  return (
    <List disablePadding>
      {exercises.map((exercise, i) => (
        <ExerciseItemWorkout
          key={exercise.id}
          itemIndex={i}
          name={exercise.name}
          sets={exercise.sets}
        />
      ))}
    </List>
  );
};
