import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";

export const useConfigureTrainerMutation = () => {
  return useMutation(AuthService[AuthMethods.CONFIGURATE_TRAINER]);
};
