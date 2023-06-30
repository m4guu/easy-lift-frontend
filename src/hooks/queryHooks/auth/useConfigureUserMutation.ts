import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";
import { Error } from "../../../shared/interfaces";

export const useConfigureUserMutation = () => {
  return useMutation<
    void,
    Error,
    {
      updatedUser: FormData;
      userId: string;
    },
    unknown
  >(AuthService[AuthMethods.CONFIGURATE_USER]);
};
