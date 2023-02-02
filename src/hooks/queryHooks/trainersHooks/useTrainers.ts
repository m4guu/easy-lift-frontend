import { useQuery } from "@tanstack/react-query";

import { TrainersService, TrainersMethods } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useTrainers = () => {
  return useQuery([QueryKey.TRAINERS], TrainersService[TrainersMethods.GET]);
};
