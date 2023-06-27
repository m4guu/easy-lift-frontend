import { useMutation } from "@tanstack/react-query";

import { AuthService, AuthMethods } from "../../../services";
import { Error, LoginCredentials, User } from "../../../shared/interfaces";

export const useLogin = () => {
  return useMutation<
    {
      user: User;
    },
    Error,
    LoginCredentials,
    unknown
  >(AuthService[AuthMethods.LOGIN]);
};
