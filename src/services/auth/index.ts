import { ENDPOINTS, HttpService } from "../api";

import { User, LoginCredentials } from "../../shared/interfaces";

export enum AuthMethods {
  LOGIN = "login",
  LOGOUT = "logout",
  RESET_PASSWORD = "resetPassword",
  CREATE = "create",
  UPDATE = "update",
}

const AuthService = {
  [AuthMethods.LOGIN]: (credentials: LoginCredentials) =>
    // ! dummy login with json server [change when the backend will be ready] get -> post
    HttpService.get<User[]>(`${ENDPOINTS.USERS}?email=${credentials.email}`),

  [AuthMethods.LOGOUT]: () => HttpService.post<void>(ENDPOINTS.LOGOUT),

  [AuthMethods.RESET_PASSWORD]: (password: string) =>
    HttpService.post<User>(ENDPOINTS.RESET_PASSWORD, password),

  [AuthMethods.CREATE]: (newUser: User) =>
    HttpService.post<void>(ENDPOINTS.USERS, newUser),

  [AuthMethods.UPDATE]: (updatedUser: User, userId: string) =>
    HttpService.put<void>(`${ENDPOINTS.USERS}/${userId}`, updatedUser),
};

export default AuthService;
