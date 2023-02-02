import { useQuery } from "@tanstack/react-query";

import { QueryKey, Status } from "../../../shared/enums";

import { UserProgressService, UserProgressMethods } from "../../../services";

export const useUserExerciseProgress = (
  userId: string,
  exerciseId?: string
) => {
  if (!exerciseId) {
    return {
      status: Status.ERROR,
      data: [],
      error: { message: "Expected provided ID.", code: 404 },
    };
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useQuery([QueryKey.USER_PROGRESS, exerciseId], () =>
    UserProgressService[UserProgressMethods.GET_USER_EXERCISE_PROGRESS](
      userId,
      exerciseId
    )
  );
};
