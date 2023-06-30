import { useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";
import { Error, UpdateWorkout } from "../../../shared/interfaces";

export const useUpdateWorkoutMutation = () => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WORKOUTS],
    [QueryKey.USER_PROGRESS],
    [QueryKey.USER_WORKOUTS_BY_MONTH],
  ]);

  return useMutation<void, Error, UpdateWorkout, unknown>(
    WorkoutsService[WorkoutsMethods.UPDATE],
    {
      onSuccess: () => {
        invalidateQueries();
      },
    }
  );
};
