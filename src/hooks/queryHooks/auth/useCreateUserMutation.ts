import { useMutation } from "@tanstack/react-query";

import { AuthMethods, AuthService } from "../../../services";
import { CreateUser, Error } from "../../../shared/interfaces";

export const useCreateUserMutation = () => {
  return useMutation<void, Error, CreateUser>(AuthService[AuthMethods.CREATE]);
};
