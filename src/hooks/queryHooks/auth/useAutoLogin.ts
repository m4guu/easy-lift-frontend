import { useMutation } from "@tanstack/react-query";

import { AuthService, AuthMethods } from "../../../services";

export const useAutoLogin = () => {
  return useMutation(AuthService[AuthMethods.AUTO_LOGIN]);
};
