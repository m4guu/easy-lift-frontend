import { v4 as uuidv4 } from "uuid";

import {
  TrainerConfig,
  TrainerConfigFields,
} from "../../hooks/formHooks/configuration/useTrainerConfigForm";
import {
  UserConfig,
  UserConfigFields,
} from "../../hooks/formHooks/configuration/useUserConfigForm";

import { Role } from "../../shared/enums";
import { User } from "../../shared/interfaces";

export const generateDefaultUserConfigFormValues = (user: User): UserConfig => {
  return {
    [UserConfigFields.NAME]: user.name,
    [UserConfigFields.WEIGHT]: user.bodyWeights?.at(-1)?.weight!,
    [UserConfigFields.HEIGHT]: user.height!,
    [UserConfigFields.IMAGE]: undefined as unknown as File[],
  };
};

export const generateDefaultTrainerConfigFormValues = (
  user: User
): TrainerConfig => {
  return {
    [TrainerConfigFields.NAME]: user.name,
    [TrainerConfigFields.DESCRIPTION]: user.description!,
    [TrainerConfigFields.IMAGE]: undefined as unknown as File[],
    [TrainerConfigFields.GYMS]: user.gyms!,
  };
};

export const generateUserBasicInfo = (
  user: User
): { id: string; name: string; value: string | number }[] => {
  const basicInfo =
    user.role === Role.user
      ? [
          { id: uuidv4(), name: "name", value: user.name },
          { id: uuidv4(), name: "height", value: user.height! },
          {
            id: uuidv4(),
            name: "weight",
            value: user.bodyWeights?.at(-1)?.weight!,
          },
        ]
      : [
          { id: uuidv4(), name: "name", value: user.name },
          { id: uuidv4(), name: "description", value: user.description! },
        ];
  return basicInfo;
};
