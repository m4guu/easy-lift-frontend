import { ENDPOINTS, HttpService } from "../api";

import {
  User,
  CreateUser,
  LoginCredentials,
  UpdateEmailData,
  UpdatePasswordData,
} from "../../shared/interfaces";

export enum AuthMethods {
  LOGIN = "login",
  AUTO_LOGIN = "autoLogin",
  LOGOUT = "logout",
  CONFIGURATE_USER = "configUser",
  CONFIGURATE_TRAINER = "configTrainer",
  UPDATE_EMAIL = "updateEmail",
  UPDATE_PASSWORD = "updatePassword",
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

  [AuthMethods.UPDATE_EMAIL]: (updateEmailData: UpdateEmailData) =>
    HttpService.patch<User>(ENDPOINTS.UPDATE_EMAIL, updateEmailData),

  [AuthMethods.UPDATE_PASSWORD]: (updatePasswordData: UpdatePasswordData) =>
    HttpService.patch<User>(ENDPOINTS.UPDATE_PASSWORD, updatePasswordData),
};

export default AuthService;
