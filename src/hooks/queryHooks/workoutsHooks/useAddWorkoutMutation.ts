import { useQueryClient, useMutation } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useAddWorkoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(WorkoutsService[WorkoutsMethods.CREATE], {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries([QueryKey.USER_WORKOUTS]);
    },
  });
};
