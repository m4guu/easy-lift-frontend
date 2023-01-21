import { Role } from "../../shared/enums";

import { trainerRoutes, userRoutes } from "./constans";

export const getRoutes = (role: Role) => {
  switch (role) {
    case Role.trainer:
      return trainerRoutes;
    case Role.user:
      return userRoutes;
    default:
      return null;
  }
};
