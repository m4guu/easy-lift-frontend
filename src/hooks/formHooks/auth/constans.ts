import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { User } from "../../../shared/interfaces";
import { Role } from "../../../shared/enums";

export const authLoginSchema = yup.object().shape({});

export const defaultUser: User = {
  id: uuidv4(),
  name: "",
  email: "",
  password: "",
  role: Role.trainer,
  isConfigured: false,
  image: null, // DUMMY DATA
  bodyWeights: [],
  expirationDate: "",
};
