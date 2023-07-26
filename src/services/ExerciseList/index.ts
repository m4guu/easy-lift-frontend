import { ExerciseDBHttpService, ENDPOINTS } from "../api";

import { Exercise } from "../../shared/interfaces";

export enum ExerciseDBMethods {
  GET_ALL_EXERCISES = "getAllExercises",
}

const ExerciseDBService = {
  [ExerciseDBMethods.GET_ALL_EXERCISES]: (
    pageParam: number,
    searchName: string
  ) =>
    ExerciseDBHttpService.get<Exercise[]>(
      `${ENDPOINTS.EXERCISES}?pages=${pageParam}&name=${searchName}`
    ),
};

export default ExerciseDBService;
