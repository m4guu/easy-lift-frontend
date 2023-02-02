import { useMutation } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";

import { useInvalidateQueries } from "../useInvalidateQuries";

import { QueryKey } from "../../../shared/enums";

export const useDeleteProgramMutation = (programId: string) => {
  const { invalidateQueries } = useInvalidateQueries([
    [QueryKey.TRAINER_PROGRAMS],
    [QueryKey.PROGRAMS],
    [QueryKey.PROGRAM, programId],
  ]);

  return useMutation(ProgramsService[ProgramsMethods.DELETE], {
    onSuccess: () => {
      invalidateQueries();
    },
  });
};
