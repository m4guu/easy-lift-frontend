import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";

export const useUpdateEmailMutation = () => {
  return useMutation(AuthService[AuthMethods.UPDATE_EMAIL]);
};
