import { Role } from "../../enums";

interface CreateUser {
  email: string;
  password: string;
  role: Role;
}
export default CreateUser;
