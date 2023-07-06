import { User } from "../../../../../shared/interfaces";
import { PATHS } from "../../../../paths";
import { Role } from "../../../../../shared/enums";

type Iteration = {
  user: Partial<User>;
  expectedUrl: string;
};
export const mockedEmail = "mocked@email.com";
export const mockedPassword = "mockedPassword";
export const mockedUser: User = {
  id: "mocked-id",
  name: "mocked-name",
  email: "mocked@email.com",
  password: "mockedPassword",
  role: Role.user,
  isConfigured: true,
  image: "mockedImageString",
};
export const configuredUserMock: Partial<User> = {
  isConfigured: true,
};
export const notConfiguredUserMock: Partial<User> = {
  isConfigured: false,
};

export const userTestCases: [Iteration][] = [
  [
    {
      user: configuredUserMock,
      expectedUrl: PATHS.default,
    },
  ],
  [
    {
      user: notConfiguredUserMock,
      expectedUrl: PATHS.CONFIGURATION,
    },
  ],
];
