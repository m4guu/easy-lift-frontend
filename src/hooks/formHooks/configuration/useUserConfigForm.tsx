import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useConfigureUserMutation } from "../../queryHooks/auth/useConfigureUserMutation";
import { useUserContext } from "../../../contexts/userContext";
import useSnackbar from "../../useSnackbar";

import { User } from "../../../shared/interfaces";
import { PATHS } from "../../../pages/paths";
import { SnackbarStatus, Status } from "../../../shared/enums";
import { defaultHeightValue, defaultWeightValue } from "./constans";

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
  [UserConfigFields.HEIGHT]: defaultHeightValue,
  [UserConfigFields.WEIGHT]: defaultWeightValue,
  [UserConfigFields.IMAGE]: undefined as unknown as File[],
};

const defaultSchema = yup.object().shape({
  [UserConfigFields.NAME]: yup.string().required().min(4).max(15),
  [UserConfigFields.HEIGHT]: yup.number().required().min(60).max(260),
  [UserConfigFields.WEIGHT]: yup.number().required().min(30).max(610),
});

export const useUserConfigForm = ({
  defaultUpdateValues,
}: {
  defaultUpdateValues?: UserConfig;
}) => {
  const { user, autoLogin } = useUserContext();
  const {
    status: updateUserStatus,
    error: updateUserError,
    isLoading: isUpdatingUser,
    mutateAsync: configureUserQuery,
  } = useConfigureUserMutation();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const schema = defaultUpdateValues
    ? defaultSchema
    : defaultSchema.shape({
        [UserConfigFields.IMAGE]: yup.mixed().required(),
      });

  const methods = useForm<UserConfig>({
    defaultValues: defaultUpdateValues || defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { name, height, weight } = watch();
  const canSubmit = name && height && weight;

  const onSubmit = useCallback(
    (formValues: UserConfig) => {
      const updatedUser: Partial<User> = {
        name: formValues.name,
        height: formValues.height,
        currentWeight: formValues.weight,
        image: formValues.image ? formValues.image[0] : "",
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

      configureUserQuery({
        updatedUser: formData,
        userId: user!.id,
      }).then(() => {
        resetForm();
        autoLogin();
        navigate(PATHS.default);
      });
    },
    [configureUserQuery, resetForm, user, navigate, autoLogin]
  );

  // snackbar
  useEffect(() => {
    if (updateUserError) {
      snackbar(updateUserError.message, SnackbarStatus.ERROR);
    }
    if (!isUpdatingUser && updateUserStatus === Status.SUCCESS) {
      snackbar(
        "Saved! Thank you for keeping us up to date.",
        SnackbarStatus.SUCCESS
      );
    }
  }, [snackbar, updateUserError, isUpdatingUser, updateUserStatus]);

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    isUpdatingUser,
  };
};
