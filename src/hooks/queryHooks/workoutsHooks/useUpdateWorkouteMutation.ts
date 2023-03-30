import { useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";

export const useUpdateWorkoutMutation = (workoutId?: string) => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WORKOUTS],
    [QueryKey.WORKOUT, workoutId],
    [QueryKey.USER_PROGRESS],
  ]);

  return useMutation(WorkoutsService[WorkoutsMethods.UPDATE], {
    onSuccess: () => {
      invalidateQueries();
    },
  });
};
