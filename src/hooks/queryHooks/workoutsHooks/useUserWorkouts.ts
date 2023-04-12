import { useInfiniteQuery } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useUserWorkouts = (userId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useInfiniteQuery(
    [QueryKey.USER_WORKOUTS],
    ({ pageParam = 1 }) =>
      WorkoutsService[WorkoutsMethods.GET_USER_WORKOUTS](userId, pageParam),
    {
      getNextPageParam: (lastPage, pages) =>
        // is there next page validation
        lastPage.length < 10 ? undefined : pages.length + 1,
    }
  );
};
