import { ENDPOINTS, HttpService } from "../api";

import { Workout } from "../../shared/interfaces";

enum WorkoutsMethods {
  GET_USER_WORKOUTS = "getUserWorkouts",
  GET_WORKOUT_BY_ID = "getWorkoutById",
  CREATE = "create",
  DELETE = "delete",
}

const WorkoutsService = {
  [WorkoutsMethods.GET_USER_WORKOUTS]: (userId: string) =>
    HttpService.get(`${ENDPOINTS.WORKOUTS}?creator=${userId}`),

  [WorkoutsMethods.GET_WORKOUT_BY_ID]: (workoutuId: string) =>
    HttpService.get(`${ENDPOINTS.WORKOUTS}?id=${workoutuId}`),

  [WorkoutsMethods.CREATE]: (newWorkout: Workout) =>
    HttpService.post(ENDPOINTS.WORKOUTS, newWorkout),

  [WorkoutsMethods.DELETE]: (workoutId: string) =>
    HttpService.delete(`${ENDPOINTS.WORKOUTS}/${workoutId}`),
};

export default WorkoutsService;
