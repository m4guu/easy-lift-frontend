import { useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";

export const useDeleteWorkoutMutation = (workoutId: string) => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WORKOUTS],
    [QueryKey.WORKOUT, workoutId],
    [QueryKey.USER_PROGRESS],
  ]);

  return useMutation(WorkoutsService[WorkoutsMethods.DELETE], {
    onSuccess: () => {
      invalidateQueries();
    },
  });
};
