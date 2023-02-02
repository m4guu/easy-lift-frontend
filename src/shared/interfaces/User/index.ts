import BodyWeight from "../BodyWeight";
import { Role } from "../../enums";

interface User {
  id: string;
  role: Role;
  isConfigured: boolean;
  image: string; // DUMMY DATA
  bodyWeights?: BodyWeight[];
  height?: number;
  expirationDate: string;
}
export default User;
