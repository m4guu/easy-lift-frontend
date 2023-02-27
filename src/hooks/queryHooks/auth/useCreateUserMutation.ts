import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";

export const useCreateUserMutation = () => {
  return useMutation(AuthService[AuthMethods.CREATE]);
};
