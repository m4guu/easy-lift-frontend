import { useInfiniteQuery } from "@tanstack/react-query";

import { ExerciseDBMethods, ExerciseDBService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useExercises = (searchName: string) => {
  return useInfiniteQuery(
    [QueryKey.EXERCISES],
    ({ pageParam = 1 }) =>
      ExerciseDBService[ExerciseDBMethods.GET_ALL_EXERCISES](
        pageParam,
        searchName
      ),
    {
      getNextPageParam: (lastPage, pages) =>
        // is there next page validation
        lastPage.length < 10 ? undefined : pages.length + 1,
    }
  );
};
