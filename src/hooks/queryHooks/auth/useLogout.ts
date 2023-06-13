import { useMutation } from "@tanstack/react-query";

import { AuthService, AuthMethods } from "../../../services";

export const useLogout = () => {
  return useMutation(AuthService[AuthMethods.LOGOUT]);
};
