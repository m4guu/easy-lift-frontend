import { useQueryClient, useMutation } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useAddProgramMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(ProgramsService[ProgramsMethods.CREATE], {
    onSuccess: () => {
      queryClient.invalidateQueries([QueryKey.TRAINER_PROGRAMS]);
    },
  });
};
