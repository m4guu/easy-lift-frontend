import { HttpService, ENDPOINTS } from "../api";

enum TrainersMethods {
  GET = "get",
  GET_TRAINER_BY_ID = "getTrainerById",
}

const TrainersService = {
  [TrainersMethods.GET]: () => HttpService.get(ENDPOINTS.TRAINERS),
  [TrainersMethods.GET_TRAINER_BY_ID]: (trainerId: string) =>
    HttpService.get(`${ENDPOINTS.TRAINERS}?id=${trainerId}`),
};

export default TrainersService;
