import { useMutation } from "@tanstack/react-query";

import { AuthService, AuthMethods } from "../../../services";

export const useLogin = () => {
  return useMutation(AuthService[AuthMethods.LOGIN]);
};
