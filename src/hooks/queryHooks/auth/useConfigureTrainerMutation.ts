import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";
import { Error } from "../../../shared/interfaces";

export const useConfigureTrainerMutation = () => {
  return useMutation<
    void,
    Error,
    {
      updatedTrainer: FormData;
      userId: string;
    },
    unknown
  >(AuthService[AuthMethods.CONFIGURATE_TRAINER]);
};
