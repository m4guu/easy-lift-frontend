import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "../../../shared/enums";

import { UserProgressService, UserProgressMethods } from "../../../services";

export const useAddUserProgresMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(UserProgressService[UserProgressMethods.CREATE], {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.USER_PROGRESS]);
    },
  });
};
