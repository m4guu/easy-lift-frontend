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
  [WorkoutsMethods.GET_USER_WORKOUTS]: (userId: string) =>
    HttpService.get<Workout[]>(`${ENDPOINTS.WORKOUTS}?creator=${userId}`),

  [WorkoutsMethods.GET_WORKOUT_BY_ID]: (workoutuId: string) =>
    HttpService.get<Workout[]>(`${ENDPOINTS.WORKOUTS}?id=${workoutuId}`),

  [WorkoutsMethods.CREATE]: (newWorkout: Workout) =>
    HttpService.post<void>(ENDPOINTS.WORKOUTS, newWorkout),

  [WorkoutsMethods.DELETE]: (workoutId: string) =>
    HttpService.delete<void>(`${ENDPOINTS.WORKOUTS}/${workoutId}`),

  [WorkoutsMethods.UPDATE]: (updatedWorkout: Workout) =>
    HttpService.patch<void>(
      `${ENDPOINTS.WORKOUTS}/${updatedWorkout.id}`,
      updatedWorkout
    ),
};

export default WorkoutsService;
