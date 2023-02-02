import { UserProgres } from "../../shared/interfaces";
import { HttpService, ENDPOINTS } from "../api";

export enum UserProgressMethods {
  GET_USER_PROGRESS = "getUserProgress",
  GET_USER_EXERCISE_PROGRESS = "getUserExerciseProgress",
  CREATE = "create",
  DELETE = "delete",
}

const UserProgressService = {
  [UserProgressMethods.GET_USER_PROGRESS]: (userId: string) =>
    HttpService.get<UserProgres[]>(
      `${ENDPOINTS.USERS_PROGRESS}?userId=${userId}`
    ),

  [UserProgressMethods.GET_USER_EXERCISE_PROGRESS]: (
    userId: string,
    exerciseId: string
  ) =>
    HttpService.get<UserProgres[]>(
      `${ENDPOINTS.USERS_PROGRESS}?userId=${userId}&exerciseId=${exerciseId}`
    ),

  [UserProgressMethods.CREATE]: (newUserProgres: UserProgres) =>
    HttpService.post<void>(ENDPOINTS.USERS_PROGRESS, newUserProgres),

  [UserProgressMethods.DELETE]: (WorkoutId: string) =>
    HttpService.delete<void>(
      `${ENDPOINTS.USERS_PROGRESS}?workoutId=${WorkoutId}`
    ),
};
export default UserProgressService;
