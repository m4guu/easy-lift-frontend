import { useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";

export const useAddWorkoutMutation = () => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WORKOUTS],
    [QueryKey.USER_WORKOUTS_BY_MONTH],
  ]);

  return useMutation(WorkoutsService[WorkoutsMethods.CREATE], {
    onSuccess: () => {
      invalidateQueries();
    },
  });
};
