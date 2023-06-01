import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useTrainerPrograms = (trainerId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.TRAINER_PROGRAMS], () =>
    ProgramsService[ProgramsMethods.GET_TRAINER_PROGRAMS](trainerId)
  );
};
