import { useMutation } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";
import { Error } from "../../../shared/interfaces";

export const useDeleteProgramMutation = (programId: string) => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.TRAINER_PROGRAMS],
    [QueryKey.PROGRAMS],
    [QueryKey.PROGRAM, programId],
  ]);

  return useMutation<void, Error, string, unknown>(
    ProgramsService[ProgramsMethods.DELETE],
    {
      onSuccess: () => {
        invalidateQueries();
      },
    }
  );
};
