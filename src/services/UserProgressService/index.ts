import { UserProgres } from "../../shared/interfaces";
import { HttpService, ENDPOINTS } from "../api";

export enum UserProgressMethods {
  GET_USER_PROGRESS = "getUserProgress",
  GET_USER_EXERCISE_PROGRESS = "getUserExerciseProgress",
}

const UserProgressService = {
  [UserProgressMethods.GET_USER_PROGRESS]: (userId: string) =>
    HttpService.get<UserProgres[]>(
      `${ENDPOINTS.USERS_PROGRESS}?userId=${userId}&isDraft=false`
    ),

  [UserProgressMethods.GET_USER_EXERCISE_PROGRESS]: (
    userId: string,
    exerciseId: string
  ) =>
    HttpService.get<UserProgres[]>(
      `${ENDPOINTS.USERS_PROGRESS}?userId=${userId}&exerciseId=${exerciseId}`
    ),
};
export default UserProgressService;
