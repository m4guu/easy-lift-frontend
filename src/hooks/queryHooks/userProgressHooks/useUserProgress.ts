import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "../../../shared/enums";

import { UserProgressService, UserProgressMethods } from "../../../services";

export const useUserProgress = (userId: string) => {
  return useQuery([QueryKey.USER_PROGRESS], () =>
    UserProgressService[UserProgressMethods.GET_USER_PROGRESS](userId)
  );
};
