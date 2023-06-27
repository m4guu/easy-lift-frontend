import { useInfiniteQuery } from "@tanstack/react-query";

import { UserServices, UserMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";
import { Error, User } from "../../../shared/interfaces";

export const useTrainers = (queries?: string) => {
  return useInfiniteQuery<User[], Error, User[], QueryKey[]>(
    [QueryKey.TRAINERS],
    ({ pageParam = 1 }) =>
      UserServices[UserMethods.GET_TRAINERS](pageParam, queries),
    {
      getNextPageParam: (lastPage, pages) =>
        // is there next page validation
        lastPage.length < 10 ? undefined : pages.length + 1,
    }
  );
};
