import { v4 as uuid } from "uuid";

import { getTodayDate } from "../Date";

import { UserProgres, Workout } from "../../shared/interfaces";

export const generateUserProgress = (workout: Workout): UserProgres[] => {
  return workout.exercises.map((exercise) => {
    const { id, name, sets } = exercise;
    // generate best rep max from sets
    const repMax = Math.max(...sets.map((set) => set.repMax));

    return {
      id: uuid(),
      workoutId: workout.id,
      userId: workout.creator,
      exerciseId: id,
      exerciseName: name,
      date: getTodayDate(),
      repMax,
      sets,
    };
  });
};
