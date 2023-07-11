import { UserConfig } from "../../../../hooks/formHooks/configuration/useUserConfigForm";
import { Role } from "../../../../shared/enums";
import { User } from "../../../../shared/interfaces";

export const userMock: Partial<User> = {
  role: Role.user,
  image: "mock-image",
};

export const trainerMock: Partial<User> = {
  role: Role.trainer,
};

export const validUserCongigurationData: Partial<UserConfig> = {
  name: "John",
  height: 180,
  weight: 90,
};

export const invalidUserCongigurationData: Omit<UserConfig, "image"> = {
  name: "J",
  height: 180,
  weight: 90,
};
