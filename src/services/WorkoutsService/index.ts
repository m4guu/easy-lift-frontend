import { ENDPOINTS, HttpService } from "../api";

import { Workout } from "../../shared/interfaces";

export enum WorkoutsMethods {
  GET_USER_WORKOUTS = "getUserWorkouts",
  // todo: add this method when backend will be written
  GET_USER_WORKOUTS_BY_MONTH = "getUserWorkoutsByMonth",
  GET_WORKOUT_BY_ID = "getWorkoutById",
  CREATE = "create",
  DELETE = "delete",
  UPDATE = "update",
}

const WorkoutsService = {
  [WorkoutsMethods.GET_USER_WORKOUTS]: (userId: string, pageParam: number) =>
    HttpService.get<Workout[]>(
      `${ENDPOINTS.USER_WORKOUTS}?creator=${userId}&page=${pageParam}`
    ),

  [WorkoutsMethods.GET_WORKOUT_BY_ID]: (workoutuId: string) =>
    HttpService.get<Workout>(`${ENDPOINTS.WORKOUTS}/${workoutuId}`),

  [WorkoutsMethods.GET_USER_WORKOUTS_BY_MONTH]: (
    userId: string,
    monthNumber: number
  ) =>
    HttpService.get<Workout[]>(
      `${ENDPOINTS.USER_WORKOUTS_BY_MONTH}?userId=${userId}&monthNumber=${monthNumber}`
    ),

  [WorkoutsMethods.CREATE]: (newWorkout: Omit<Workout, "id">) =>
    HttpService.post<void>(ENDPOINTS.WORKOUTS, newWorkout),

  [WorkoutsMethods.DELETE]: (workoutId: string) =>
    HttpService.delete<void>(`${ENDPOINTS.WORKOUTS}/${workoutId}`),

  [WorkoutsMethods.UPDATE]: ({
    workoutId,
    updatedWorkout,
  }: {
    workoutId: string;
    updatedWorkout: Omit<Workout, "id">;
  }) =>
    HttpService.put<void>(`${ENDPOINTS.WORKOUTS}/${workoutId}`, updatedWorkout),
};

export default WorkoutsService;
