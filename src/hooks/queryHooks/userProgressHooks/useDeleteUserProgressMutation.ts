import { useMutation, useQueryClient } from "@tanstack/react-query";

import { QueryKey } from "../../../shared/enums";

import { UserProgressService, UserProgressMethods } from "../../../services";

export const useDeleteUserProgresMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(UserProgressService[UserProgressMethods.DELETE], {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.USER_PROGRESS]);
    },
  });
};
