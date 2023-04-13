import { useQuery } from "@tanstack/react-query";

import { QueryKey } from "../../../shared/enums";

import { UserProgressService, UserProgressMethods } from "../../../services";

export const useUserExerciseProgress = (exerciseId: string, userId: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.USER_PROGRESS, exerciseId], () =>
    UserProgressService[UserProgressMethods.GET_USER_EXERCISE_PROGRESS](
      userId,
      exerciseId
    )
  );
};
