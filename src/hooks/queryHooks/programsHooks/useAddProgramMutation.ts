import { useQueryClient, useMutation } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";
import { Error } from "../../../shared/interfaces";

export const useAddProgramMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, FormData, unknown>(
    ProgramsService[ProgramsMethods.CREATE],
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QueryKey.TRAINER_PROGRAMS]);
      },
    }
  );
};
