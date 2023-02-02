import { useQuery } from "@tanstack/react-query";

import { QueryKey, Status } from "../../../shared/enums";

import { UserProgressService, UserProgressMethods } from "../../../services";

export const useUserProgress = (userId?: string) => {
  if (!userId) {
    return {
      status: Status.ERROR,
      data: [],
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.USER_PROGRESS], () =>
    UserProgressService[UserProgressMethods.GET_USER_PROGRESS](userId)
  );
};
