import { useQuery } from "@tanstack/react-query";

import { UserMethods, UserServices } from "../../../services";

import { QueryKey } from "../../../shared/enums";
import { Error, User } from "../../../shared/interfaces";

export const useUser = (userId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<User, Error, User, string[]>([QueryKey.TRAINER, userId], () =>
    UserServices[UserMethods.GET_USER_BY_ID](userId)
  );
};
