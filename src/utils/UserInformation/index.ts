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
): { name: string; value: string | number }[] => {
  const basicInfo =
    user.role === Role.user
      ? [
          { name: "name", value: user.name },
          { name: "height", value: user.height! },
          { name: "weight", value: user.bodyWeights?.at(-1)?.weight! },
        ]
      : [
          { name: "name", value: user.name },
          { name: "description", value: user.description! },
        ];
  return basicInfo;
};
