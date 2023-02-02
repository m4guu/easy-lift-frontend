import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";

import { QueryKey } from "../../../shared/enums";

export const useProgram = (programId: string) => {
  return useQuery([QueryKey.PROGRAM, programId], () =>
    ProgramsService[ProgramsMethods.GET_PROGRAM_BY_ID](programId)
  );
};
