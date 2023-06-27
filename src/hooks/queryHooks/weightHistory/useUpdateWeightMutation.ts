import { useMutation } from "@tanstack/react-query";

import { WeightHistoryMethods, WeightHistoryService } from "../../../services";
import { useInvalidateQueries } from "../useInvalidateQuries";
import { QueryKey } from "../../../shared/enums";
import { Error } from "../../../shared/interfaces";
import UpdateWeight from "../../../shared/interfaces/UpdateWeight/idnex";

export const useUpdateWeightMutation = () => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.USER_WEIGHT_HISTORY],
  ]);
  return useMutation<boolean, Error, UpdateWeight, unknown>(
    WeightHistoryService[WeightHistoryMethods.UPDATE_WEIGHT_HISTORY],
    {
      onSuccess: () => {
        invalidateQueries();
      },
    }
  );
};
