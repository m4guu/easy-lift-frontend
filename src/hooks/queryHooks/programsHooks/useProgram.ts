import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";

import { QueryKey, Status } from "../../../shared/enums";

export const useProgram = (programId?: string) => {
  if (!programId) {
    return {
      status: Status.ERROR,
      data: undefined,
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.PROGRAM, programId], () =>
    ProgramsService[ProgramsMethods.GET_PROGRAM_BY_ID](programId)
  );
};
