import { ENDPOINTS, HttpService } from "../api";

import { Workout } from "../../shared/interfaces";

export enum WorkoutsMethods {
  GET_WORKOUTS = "getWorkouts",
  GET_WORKOUT_BY_ID = "getWorkoutById",
  CREATE = "create",
  DELETE = "delete",
  UPDATE = "update",
}

const WorkoutsService = {
  [WorkoutsMethods.GET_WORKOUTS]: (pageParam: number, queries?: string) =>
    HttpService.get<Workout[]>(
      `${ENDPOINTS.WORKOUTS}?page=${pageParam}${queries}`
    ),

  [WorkoutsMethods.GET_WORKOUT_BY_ID]: (workoutuId: string) =>
    HttpService.get<Workout>(`${ENDPOINTS.WORKOUTS}/${workoutuId}`),

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
