import BodyWeight from "../BodyWeight";
import { Role } from "../../enums";

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  isConfigured: boolean;
  image: File;
  description?: string;
  gyms?: string[];
  bodyWeights?: BodyWeight[];
  height?: number;
}

export default User;
