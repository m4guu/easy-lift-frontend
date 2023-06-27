import { WeightHistory } from "../../shared/interfaces";
import UpdateWeight from "../../shared/interfaces/UpdateWeight/idnex";
import { HttpService, ENDPOINTS } from "../api";

export enum WeightHistoryMethods {
  GET_WEIGHT_HISTORY_BY_USER_ID = "getWHByUserId",
  UPDATE_WEIGHT_HISTORY = "updateWeightHistory",
}

const WeightHistoryService = {
  [WeightHistoryMethods.GET_WEIGHT_HISTORY_BY_USER_ID]: (
    userId: string
  ): Promise<WeightHistory> =>
    HttpService.get(`${ENDPOINTS.WEIGHT_HISTORY}/${userId}`),

  [WeightHistoryMethods.UPDATE_WEIGHT_HISTORY]: ({
    userId,
    weight,
  }: UpdateWeight): Promise<boolean> =>
    HttpService.patch(ENDPOINTS.UPDATE_WEIGHT_HISTORY, { userId, weight }),
};

export default WeightHistoryService;
