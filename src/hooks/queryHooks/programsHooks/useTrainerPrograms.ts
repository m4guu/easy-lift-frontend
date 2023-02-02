import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useTrainerPrograms = (trainerId: string) => {
  return useQuery([QueryKey.TRAINER_PROGRAMS], () =>
    ProgramsService[ProgramsMethods.GET_TRAINER_PROGRAMS](trainerId)
  );
};
