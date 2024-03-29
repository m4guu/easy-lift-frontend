import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";

import { QueryKey } from "../../../shared/enums";
import { Error, Program } from "../../../shared/interfaces";

export const useProgram = (programId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery<Program, Error>([QueryKey.PROGRAM, programId], () =>
    ProgramsService[ProgramsMethods.GET_PROGRAM_BY_ID](programId)
  );
};
