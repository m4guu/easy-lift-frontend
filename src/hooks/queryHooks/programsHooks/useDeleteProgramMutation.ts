import { useQueryClient, useMutation } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useDeleteProgramMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(ProgramsService[ProgramsMethods.DELETE], {
    onSuccess: () => {
      // invalidates cache and refetch
      queryClient.invalidateQueries([QueryKey.TRAINER_PROGRAMS]);
    },
  });
};
