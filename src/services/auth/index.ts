import { ENDPOINTS, HttpService } from "../api";

import { User, CreateUser, LoginCredentials } from "../../shared/interfaces";

export enum AuthMethods {
  LOGIN = "login",
  AUTO_LOGIN = "autoLogin",
  LOGOUT = "logout",
  CONFIGURATE_USER = "configUser",
  CONFIGURATE_TRAINER = "configTrainer",
  RESET_PASSWORD = "resetPassword",
  CREATE = "create",
  UPDATE = "update",
}

const AuthService = {
  [AuthMethods.LOGIN]: (credentials: LoginCredentials) =>
    HttpService.post<{ user: User }>(ENDPOINTS.LOGIN, credentials),

  [AuthMethods.AUTO_LOGIN]: () =>
    HttpService.get<{ user: User }>(ENDPOINTS.AUTO_LOGIN),

  [AuthMethods.CREATE]: (newUser: CreateUser) =>
    HttpService.post<void>(ENDPOINTS.REGISTER, newUser),

  [AuthMethods.CONFIGURATE_USER]: ({
    updatedUser,
    userId,
  }: {
    updatedUser: FormData;
    userId: string;
  }) =>
    HttpService.patch<void>(
      `${ENDPOINTS.USERS}/${ENDPOINTS.CONFIG_USER}/${userId}`,
      updatedUser
    ),

  [AuthMethods.CONFIGURATE_TRAINER]: ({
    updatedTrainer,
    userId,
  }: {
    updatedTrainer: FormData;
    userId: string;
  }) =>
    HttpService.patch<void>(
      `${ENDPOINTS.USERS}/${ENDPOINTS.CONFIG_TRAINER}/${userId}`,
      updatedTrainer
    ),

  [AuthMethods.UPDATE]: ({
    updatedUser,
    userId,
  }: {
    updatedUser: FormData;
    userId: string;
  }) => HttpService.patch<void>(`${ENDPOINTS.USERS}/${userId}`, updatedUser),

  [AuthMethods.LOGOUT]: () => HttpService.post<void>(ENDPOINTS.LOGOUT),

  [AuthMethods.RESET_PASSWORD]: (password: string) =>
    HttpService.post<User>(ENDPOINTS.RESET_PASSWORD, password),
};

export default AuthService;
