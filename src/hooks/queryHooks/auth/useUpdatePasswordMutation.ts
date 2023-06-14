import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";

export const useUpdatePasswordMutation = () => {
  return useMutation(AuthService[AuthMethods.UPDATE_PASSWORD]);
};
