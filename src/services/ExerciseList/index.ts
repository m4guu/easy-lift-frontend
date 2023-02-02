//! internal api/service used in development, to dont exceed the limit of paid external api
import { ExerciseDBHttpService, HttpService, ENDPOINTS } from "../api";

import { Exercise } from "../../shared/interfaces";

export enum ExerciseDBMethods {
  GET_ALL_EXERCISES = "getAllExercises",
  GET_EXERCISE_BY_ID = "getExerciseById",
  GET_BODY_PARTS = "getBodyParts",
}

const ExerciseDBService = {
  [ExerciseDBMethods.GET_ALL_EXERCISES]: () =>
    HttpService.get<Exercise[]>(`${ENDPOINTS.EXERCISES}?_limit=40`),

  [ExerciseDBMethods.GET_EXERCISE_BY_ID]: (exerciseId: string) =>
    HttpService.get<Exercise[]>(`${ENDPOINTS.EXERCISES}?id=${exerciseId}`),

  [ExerciseDBMethods.GET_BODY_PARTS]: () =>
    ExerciseDBHttpService.get<string[]>(
      `${ENDPOINTS.EXERCISES}/${ENDPOINTS.BODY_PARTS}`
    ),
};

export default ExerciseDBService;
