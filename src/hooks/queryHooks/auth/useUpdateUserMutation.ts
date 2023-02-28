import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";

export const useUpdateUserMutation = () => {
  return useMutation(AuthService[AuthMethods.UPDATE]);
};
