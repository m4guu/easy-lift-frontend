import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const use10Programs = () => {
  return useQuery(
    [QueryKey.TEN_PROGRAMS],
    ProgramsService[ProgramsMethods.GET_10_PROGRAMS]
  );
};
