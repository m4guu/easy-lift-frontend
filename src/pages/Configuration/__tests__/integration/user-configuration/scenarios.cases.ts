import {
  defaultHeightValue,
  defaultWeightValue,
} from "../../../../../hooks/formHooks/configuration/constans";
import { UserConfig } from "../../../../../hooks/formHooks/configuration/useUserConfigForm";
import { PATHS } from "../../../../paths";
import { invalidUserConfigData, validUserConfigData } from "../constans";

type Iteration = {
  configData: UserConfig;
  expectedFormValues: Omit<UserConfig, "image">;
  expectedUrl?: string;
};

export const userConfigTestCases: [Iteration][] = [
  [
    {
      configData: validUserConfigData,
      expectedFormValues: {
        name: "",
        height: defaultHeightValue,
        weight: defaultWeightValue,
      },
      expectedUrl: PATHS.default,
    },
  ],
  [
    {
      configData: invalidUserConfigData,
      expectedFormValues: invalidUserConfigData,
      expectedUrl: "",
    },
  ],
];
