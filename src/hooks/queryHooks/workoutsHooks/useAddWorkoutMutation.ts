import { useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";
import { Error, Workout } from "../../../shared/interfaces";

export const useAddWorkoutMutation = () => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WORKOUTS],
    [QueryKey.USER_WORKOUTS_BY_MONTH],
  ]);

  return useMutation<void, Error, Omit<Workout, "id">, unknown>(
    WorkoutsService[WorkoutsMethods.CREATE],
    {
      onSuccess: () => {
        invalidateQueries();
      },
    }
  );
};
