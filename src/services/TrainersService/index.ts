import { HttpService, ENDPOINTS } from "../api";

import { Trainer } from "../../shared/interfaces";

export enum TrainersMethods {
  GET = "get",
  GET_TRAINER_BY_ID = "getTrainerById",
}

const TrainersService = {
  [TrainersMethods.GET]: (): Promise<Trainer[]> =>
    HttpService.get(ENDPOINTS.TRAINERS),

  [TrainersMethods.GET_TRAINER_BY_ID]: (
    trainerId: string
  ): Promise<Trainer[]> =>
    HttpService.get(`${ENDPOINTS.TRAINERS}?id=${trainerId}`),
};

export default TrainersService;
