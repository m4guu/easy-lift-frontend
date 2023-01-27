import { useQuery } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useUserWorkouts = (userId: string) => {
  return useQuery([QueryKey.USER_WORKOUTS], () =>
    WorkoutsService[WorkoutsMethods.GET_USER_WORKOUTS](userId)
  );
};
