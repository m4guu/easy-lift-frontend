import { ENDPOINTS, HttpService } from "../api";

import { User, LoginCredentials } from "../../shared/interfaces";

export enum AuthMethods {
  LOGIN = "login",
  LOGOUT = "logout",
  RESET_PASSWORD = "resetPassword",
}

const AuthService = {
  [AuthMethods.LOGIN]: (credentials: LoginCredentials) =>
    // ! dummy login with json server [change when the backend will be ready] get->post
    HttpService.get<User>(ENDPOINTS.LOGIN),

  [AuthMethods.LOGOUT]: () => HttpService.post<void>(ENDPOINTS.LOGOUT),

  [AuthMethods.RESET_PASSWORD]: (password: string) =>
    HttpService.post<User>(ENDPOINTS.RESET_PASSWORD, password),
};

export default AuthService;
