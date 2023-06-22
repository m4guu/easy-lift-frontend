import { useInfiniteQuery } from "@tanstack/react-query";

import { WorkoutsService, WorkoutsMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useWorkouts = (queries?: string, identifier?: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useInfiniteQuery(
    [QueryKey.USER_WORKOUTS, identifier],
    ({ pageParam = 1 }) =>
      WorkoutsService[WorkoutsMethods.GET_WORKOUTS](pageParam, queries),
    {
      getNextPageParam: (lastPage, pages) =>
        // is there next page validation
        lastPage.length < 10 ? undefined : pages.length + 1,
    }
  );
};
