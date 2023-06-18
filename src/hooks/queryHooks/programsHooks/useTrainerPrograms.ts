import { useInfiniteQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useTrainerPrograms = (trainerId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useInfiniteQuery(
    [QueryKey.TRAINER_PROGRAMS],
    ({ pageParam = 1 }) =>
      ProgramsService[ProgramsMethods.GET_TRAINER_PROGRAMS](
        trainerId,
        pageParam
      ),
    {
      getNextPageParam: (lastPage, pages) =>
        // is there next page validation
        lastPage.length < 10 ? undefined : pages.length + 1,
    }
  );
};
