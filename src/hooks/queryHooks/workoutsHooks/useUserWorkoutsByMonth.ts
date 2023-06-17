import { useQuery } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useUserWorkoutsByMonth = (userId: string, monthNumber: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.USER_WORKOUTS_BY_MONTH], () =>
    WorkoutsService[WorkoutsMethods.GET_USER_WORKOUTS_BY_MONTH](
      userId,
      monthNumber
    )
  );
};
