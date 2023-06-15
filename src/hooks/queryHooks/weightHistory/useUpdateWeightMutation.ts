import { useMutation } from "@tanstack/react-query";

import { WeightHistoryMethods, WeightHistoryService } from "../../../services";
import { useInvalidateQueries } from "../useInvalidateQuries";
import { QueryKey } from "../../../shared/enums";

export const useUpdateWeightMutation = () => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WEIGHT_HISTORY],
  ]);
  return useMutation(
    WeightHistoryService[WeightHistoryMethods.UPDATE_WEIGHT_HISTORY],
    {
      onSuccess: () => {
        invalidateQueries();
      },
    }
  );
};
