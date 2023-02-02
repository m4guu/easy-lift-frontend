import { useQuery } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { QueryKey, Status } from "../../../shared/enums";

export const useWorkout = (workoutId?: string) => {
  if (!workoutId) {
    return {
      status: Status.ERROR,
      data: [],
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.WORKOUT, workoutId], () =>
    WorkoutsService[WorkoutsMethods.GET_WORKOUT_BY_ID](workoutId)
  );
};
