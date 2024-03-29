import { useMutation } from "@tanstack/react-query";

import { ProgramsService, ProgramsMethods } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";
import { Error, UpdateProgram } from "../../../shared/interfaces";

export const useUpdateProgramMutation = (programId: string) => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.TRAINER_PROGRAMS],
    [QueryKey.PROGRAMS],
    [QueryKey.PROGRAM, programId],
  ]);

  return useMutation<void, Error, UpdateProgram, unknown>(
    ProgramsService[ProgramsMethods.UPDATE],
    {
      onSuccess: () => {
        invalidateQueries();
      },
    }
  );
};
