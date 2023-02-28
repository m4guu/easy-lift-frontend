import BodyWeight from "../BodyWeight";
import { Role } from "../../enums";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isConfigured: boolean;
  image: File | null; // DUMMY DATA
  description?: string;
  gyms?: string[];
  bodyWeights?: BodyWeight[];
  height?: number;
  expirationDate: string;
}
export default User;
