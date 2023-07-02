import { CreateUser } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";

export const validRegistrationDataMock: CreateUser = {
  email: "valid@email.com",
  password: "validPassword",
  role: Role.user,
};
