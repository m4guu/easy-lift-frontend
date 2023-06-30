import { useQuery } from "@tanstack/react-query";

import { UserProgressService, UserProgressMethods } from "../../../services";

import { QueryKey } from "../../../shared/enums";
import { Error, UserProgres } from "../../../shared/interfaces";

export const useUserProgress = (userId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<UserProgres[], Error>([QueryKey.USER_PROGRESS], () =>
    UserProgressService[UserProgressMethods.GET_USER_PROGRESS](userId)
  );
};
