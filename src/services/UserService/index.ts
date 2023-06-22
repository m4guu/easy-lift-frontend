import { HttpService, ENDPOINTS } from "../api";

import { User } from "../../shared/interfaces";
import { Role } from "../../shared/enums";

export enum UserMethods {
  GET_TRAINERS = "getTrainers",
  GET_USER_BY_ID = "getUserById",
}

const UserServices = {
  [UserMethods.GET_TRAINERS]: (pageParam: number): Promise<User[]> =>
    HttpService.get(
      `${ENDPOINTS.USERS}?role=${Role.trainer}&page=${pageParam}`
    ),

  [UserMethods.GET_USER_BY_ID]: (userId: string): Promise<User> =>
    HttpService.get(`${ENDPOINTS.USERS}/${userId}`),
};

export default UserServices;
