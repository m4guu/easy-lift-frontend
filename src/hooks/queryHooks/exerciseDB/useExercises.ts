import { useQuery } from "@tanstack/react-query";

import { ExerciseDBMethods, ExerciseDBService } from "../../../services";
import { QueryKey } from "../../../shared/enums";

export const useExercises = () => {
  return useQuery(
    [QueryKey.EXERCISES],
    ExerciseDBService[ExerciseDBMethods.GET_ALL_EXERCISES]
  );
};
