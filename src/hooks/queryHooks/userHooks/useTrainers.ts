import { useQuery } from "@tanstack/react-query";

import { UserServices, UserMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useTrainers = () => {
  return useQuery([QueryKey.TRAINERS], UserServices[UserMethods.GET_TRAINERS]);
};
