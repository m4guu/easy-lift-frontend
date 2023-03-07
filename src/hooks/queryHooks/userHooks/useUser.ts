import { useQuery } from "@tanstack/react-query";

import { UserMethods, UserServices } from "../../../services";

import { QueryKey, Status } from "../../../shared/enums";

export const useUser = (userId?: string) => {
  if (!userId) {
    return {
      status: Status.ERROR,
      data: [],
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.TRAINER, userId], () =>
    UserServices[UserMethods.GET_USER_BY_ID](userId)
  );
};
