import { useQuery } from "@tanstack/react-query";

import { WeightHistoryService, WeightHistoryMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useWeightHistory = (userId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.USER_WEIGHT_HISTORY], () =>
    WeightHistoryService[WeightHistoryMethods.GET_WEIGHT_HISTORY_BY_USER_ID](
      userId
    )
  );
};
