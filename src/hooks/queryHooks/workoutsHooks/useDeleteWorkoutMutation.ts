import { useQueryClient, useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useDeleteWorkoutMutation = (workoutId: string) => {
  const queryClient = useQueryClient();

  return useMutation(WorkoutsService[WorkoutsMethods.DELETE], {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries([QueryKey.USER_WORKOUTS]);
      queryClient.invalidateQueries([QueryKey.WORKOUT, workoutId]);
      queryClient.invalidateQueries([QueryKey.USER_PROGRESS]);
    },
  });
};
