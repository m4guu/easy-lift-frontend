import { useInfiniteQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";
import { Error, Program } from "../../../shared/interfaces";

export const usePrograms = (queries?: string, identifier?: string) => {
  return useInfiniteQuery<Program[], Error>(
    [QueryKey.PROGRAMS, identifier],
    ({ pageParam = 1 }) =>
      ProgramsService[ProgramsMethods.GET_ALL_PROGRAMS](pageParam, queries),
    {
      getNextPageParam: (lastPage, pages) =>
        // is there next page validation
        lastPage.length < 10 ? undefined : pages.length + 1,
    }
  );
};
