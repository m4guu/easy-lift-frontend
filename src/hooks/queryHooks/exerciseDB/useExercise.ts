import { useQuery } from "@tanstack/react-query";

import { ExerciseDBService, ExerciseDBMethods } from "../../../services";

import { QueryKey, Status } from "../../../shared/enums";

export const useExercise = (exerciseId?: string) => {
  if (!exerciseId) {
    return {
      status: Status.ERROR,
      data: [],
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  //   eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.EXERCISE, exerciseId], () =>
    ExerciseDBService[ExerciseDBMethods.GET_EXERCISE_BY_ID](exerciseId)
  );
};
