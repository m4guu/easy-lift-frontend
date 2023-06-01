import { ENDPOINTS, HttpService } from "../api";

import { User, CreateUser, LoginCredentials } from "../../shared/interfaces";

export enum AuthMethods {
  LOGIN = "login",
  LOGOUT = "logout",
  RESET_PASSWORD = "resetPassword",
  CREATE = "create",
  UPDATE = "update",
}

const AuthService = {
  [AuthMethods.LOGIN]: (credentials: LoginCredentials) =>
    HttpService.post<{ user: User }>(ENDPOINTS.LOGIN, credentials),

  [AuthMethods.LOGOUT]: () => HttpService.post<void>(ENDPOINTS.LOGOUT),

  [AuthMethods.RESET_PASSWORD]: (password: string) =>
    HttpService.post<User>(ENDPOINTS.RESET_PASSWORD, password),

  [AuthMethods.CREATE]: (newUser: CreateUser) =>
    HttpService.post<void>(ENDPOINTS.REGISTER, newUser),

  [AuthMethods.UPDATE]: (updatedUser: User) => HttpService.get<void>(`profile`),
};

export default AuthService;
