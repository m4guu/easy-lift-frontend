import { User } from "../../../../../shared/interfaces";
import { PATHS } from "../../../../paths";
import { notConfiguredUserMock, configuredUserMock } from "../constans";

type Iteration = {
  user: Partial<User>;
  expectedUrl: string;
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
