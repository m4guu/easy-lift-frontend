import { useQuery } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { QueryKey } from "../../../shared/enums";
import { Error, Workout } from "../../../shared/interfaces";

export const useWorkout = (workoutId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<Workout, Error>([QueryKey.WORKOUT, workoutId], () =>
    WorkoutsService[WorkoutsMethods.GET_WORKOUT_BY_ID](workoutId)
  );
};
