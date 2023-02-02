import { useQuery } from "@tanstack/react-query";

import { ExerciseDBService, ExerciseDBMethods } from "../../../services";

export const useBodyParts = () =>
  useQuery([], ExerciseDBService[ExerciseDBMethods.GET_BODY_PARTS]);
