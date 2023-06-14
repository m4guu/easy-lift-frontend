import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserContext } from "../../../contexts/userContext";
import { useUpdatePasswordMutation } from "../../queryHooks/auth/useUpdatePasswordMutation";
import { UpdatePasswordData } from "../../../shared/interfaces";

export enum PasswordUpdateFields {
  NEW_PASSWORD = "newPassword",
  CONFIRM_PASSWORD = "confirmPassword",
  PASSWORD = "password",
}

export interface PasswordUpdate {
  [PasswordUpdateFields.NEW_PASSWORD]: string;
  [PasswordUpdateFields.CONFIRM_PASSWORD]: string;
  [PasswordUpdateFields.PASSWORD]: string;
}

const defaultValues = {
  [PasswordUpdateFields.NEW_PASSWORD]: "",
  [PasswordUpdateFields.CONFIRM_PASSWORD]: "",
  [PasswordUpdateFields.PASSWORD]: "",
};

const schema = yup.object().shape({
  [PasswordUpdateFields.NEW_PASSWORD]: yup.string().required().min(5).max(40),
  [PasswordUpdateFields.CONFIRM_PASSWORD]: yup
    .string()
    .required()
    .min(5)
    .max(40),
  [PasswordUpdateFields.PASSWORD]: yup.string().required().min(5).max(40),
});

export const usePasswordUpdateForm = () => {
  const { user } = useUserContext();
  const {
    isLoading: isUpdatingPassword,
    error: updatePasswordError,
    mutateAsync: updatePasswordQuery,
  } = useUpdatePasswordMutation();

  const methods = useForm<PasswordUpdate>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { newPassword, confirmPassword, password } = watch();
  const canSubmit = newPassword && confirmPassword && password;

  const onSubmit = useCallback(
    (formValues: PasswordUpdate) => {
      if (formValues.newPassword === formValues.confirmPassword) {
        const updatePasswordData: UpdatePasswordData = {
          userId: user?.id!,
          newPassword: formValues.newPassword,
          password: formValues.password,
        };
        updatePasswordQuery(updatePasswordData);
      } else {
        methods.setError(PasswordUpdateFields.CONFIRM_PASSWORD, {
          type: "manual",
          message: "Password must match.",
        });
      }
    },
    [methods, updatePasswordQuery, user]
  );

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    isUpdatingPassword,
    updatePasswordError,
  };
};
