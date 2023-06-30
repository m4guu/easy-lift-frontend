import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";
import { Error, UpdateEmailData, User } from "../../../shared/interfaces";

export const useUpdateEmailMutation = () => {
  return useMutation<User, Error, UpdateEmailData, unknown>(
    AuthService[AuthMethods.UPDATE_EMAIL]
  );
};
