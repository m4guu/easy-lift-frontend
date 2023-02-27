import BodyWeight from "../BodyWeight";
import Gym from "../Gym";
import { Role } from "../../enums";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isConfigured: boolean;
  image: string; // DUMMY DATA
  description?: string;
  gyms?: Gym[];
  bodyWeights?: BodyWeight[];
  height?: number;
  expirationDate: string;
}
export default User;
