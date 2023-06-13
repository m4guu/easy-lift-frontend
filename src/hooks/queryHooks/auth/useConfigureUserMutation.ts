import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";

export const useConfigureUserMutation = () => {
  return useMutation(AuthService[AuthMethods.CONFIGURATE_USER]);
};
