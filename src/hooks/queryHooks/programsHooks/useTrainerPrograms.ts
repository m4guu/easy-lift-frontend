import { useQuery } from "@tanstack/react-query";

import { ProgramsMethods, ProgramsService } from "../../../services";
import { QueryKey, Status } from "../../../shared/enums";

export const useTrainerPrograms = (trainerId?: string) => {
  if (!trainerId) {
    return {
      status: Status.ERROR,
      data: [],
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.TRAINER_PROGRAMS], () =>
    ProgramsService[ProgramsMethods.GET_TRAINER_PROGRAMS](trainerId)
  );
};
