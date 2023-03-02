import { useQuery } from "@tanstack/react-query";

import { UserMethods, UserServices } from "../../../services";

import { QueryKey } from "../../../shared/enums";

export const useUser = (userId: string) => {
  return useQuery([QueryKey.TRAINER, userId], () =>
    UserServices[UserMethods.GET_USER_BY_ID](userId)
  );
};
