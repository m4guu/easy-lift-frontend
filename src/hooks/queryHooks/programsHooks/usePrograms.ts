import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const usePrograms = () => {
  return useQuery(
    [QueryKey.PROGRAMS],
    ProgramsService[ProgramsMethods.GET_ALL_PROGRAMS]
  );
};
