import { useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";

export const useDeleteWorkoutMutation = (workoutId: string) => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WORKOUTS],
    [QueryKey.WORKOUT, workoutId],
    [QueryKey.USER_PROGRESS],
    [QueryKey.USER_WORKOUTS_BY_MONTH],
  ]);

  return useMutation(WorkoutsService[WorkoutsMethods.DELETE], {
    onSuccess: () => {
      invalidateQueries();
    },
  });
};
