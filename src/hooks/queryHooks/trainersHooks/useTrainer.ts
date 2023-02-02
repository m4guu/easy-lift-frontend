import { useQuery } from "@tanstack/react-query";

import { TrainersMethods, TrainersService } from "../../../services";

import { QueryKey } from "../../../shared/enums";

export const useTrainer = (trainerId: string) => {
  return useQuery([QueryKey.TRAINER, trainerId], () =>
    TrainersService[TrainersMethods.GET_TRAINER_BY_ID](trainerId)
  );
};
