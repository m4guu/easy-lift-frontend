import { useQuery } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";
import { QueryKey, Status } from "../../../shared/enums";

export const useUserWorkouts = (userId?: string) => {
  if (!userId) {
    return {
      status: Status.ERROR,
      data: [],
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.USER_WORKOUTS], () =>
    WorkoutsService[WorkoutsMethods.GET_USER_WORKOUTS](userId)
  );
};
