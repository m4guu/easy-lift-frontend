import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";
import { Error, UpdatePasswordData, User } from "../../../shared/interfaces";

export const useUpdatePasswordMutation = () => {
  return useMutation<User, Error, UpdatePasswordData, unknown>(
    AuthService[AuthMethods.UPDATE_PASSWORD]
  );
};
