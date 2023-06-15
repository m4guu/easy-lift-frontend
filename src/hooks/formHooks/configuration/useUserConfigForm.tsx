import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useConfigureUserMutation } from "../../queryHooks/auth/useConfigureUserMutation";
import { useUserContext } from "../../../contexts/userContext";

import { getTodayDate } from "../../../utils/Date";

import { User } from "../../../shared/interfaces";
import { PATHS } from "../../../pages/paths";

export enum UserConfigFields {
  NAME = "name",
  HEIGHT = "height",
  WEIGHT = "weight",
  IMAGE = "image",
}
export interface UserConfig {
  [UserConfigFields.NAME]: string;
  [UserConfigFields.HEIGHT]: number;
  [UserConfigFields.WEIGHT]: number;
  [UserConfigFields.IMAGE]: File[];
}

export const defaultValues: UserConfig = {
  [UserConfigFields.NAME]: "",
  [UserConfigFields.HEIGHT]: 60,
  [UserConfigFields.WEIGHT]: 30,
  [UserConfigFields.IMAGE]: undefined as unknown as File[],
};

const schema = yup.object().shape({
  [UserConfigFields.NAME]: yup.string().required().min(4).max(15),
  [UserConfigFields.HEIGHT]: yup.number().required().min(60).max(260),
  [UserConfigFields.WEIGHT]: yup.number().required().min(30).max(610),
  [UserConfigFields.IMAGE]: yup.mixed().required(),
});

export const useUserConfigForm = ({
  defaultUpdateValues,
}: {
  defaultUpdateValues?: UserConfig;
}) => {
  const {
    status: updateUserStatus,
    error: updateUserError,
    isLoading: isUpdatingUser,
    mutateAsync: configureUserQuery,
  } = useConfigureUserMutation();
  const { user, autoLogin } = useUserContext();
  const navigate = useNavigate();

  const methods = useForm<UserConfig>({
    defaultValues: defaultUpdateValues || defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { name, height, weight, image } = watch();
  const canSubmit = name && height && weight && image;

  const onSubmit = useCallback(
    (formValues: UserConfig) => {
      const updatedUser: Partial<User> = {
        name: formValues.name,
        image: formValues.image[0],
        height: formValues.height,
        bodyWeights: [{ weight: formValues.weight, date: getTodayDate() }],
      };

      const formData = new FormData();
      Object.entries(updatedUser).forEach(([fieldName, fieldValue]) => {
        if (fieldValue instanceof File) {
          formData.append(fieldName, fieldValue);
        } else if (Array.isArray(fieldValue)) {
          formData.append(fieldName, JSON.stringify(fieldValue));
        } else {
          formData.append(fieldName, fieldValue.toString());
        }
      });

      configureUserQuery({ updatedUser: formData, userId: user!.id }).then(
        () => {
          autoLogin();
          resetForm();
          navigate(PATHS.default);
        }
      );
    },
    [configureUserQuery, resetForm, user, navigate, autoLogin]
  );

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    updateUserStatus,
    updateUserError,
    isUpdatingUser,
  };
};
