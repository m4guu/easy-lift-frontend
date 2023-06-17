import { ExerciseDBHttpService, ENDPOINTS } from "../api";

import { Exercise } from "../../shared/interfaces";

export enum ExerciseDBMethods {
  GET_ALL_EXERCISES = "getAllExercises",
  GET_BODY_PARTS = "getBodyParts",
}

const ExerciseDBService = {
  [ExerciseDBMethods.GET_ALL_EXERCISES]: (pageParam: number) =>
    ExerciseDBHttpService.get<Exercise[]>(
      `${ENDPOINTS.EXERCISES}?_page=${pageParam}`
    ),

  [ExerciseDBMethods.GET_BODY_PARTS]: () =>
    ExerciseDBHttpService.get<string[]>(
      `${ENDPOINTS.EXERCISES}/${ENDPOINTS.BODY_PARTS}`
    ),
};

export default ExerciseDBService;
