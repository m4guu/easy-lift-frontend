import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserContext } from "../../../contexts/userContext";
import useSnackbar from "../../useSnackbar";
import { useUpdatePasswordMutation } from "../../queryHooks/auth/useUpdatePasswordMutation";

import { UpdatePasswordData } from "../../../shared/interfaces";
import { ErrorId, SnackbarStatus, Status } from "../../../shared/enums";
import { PATHS } from "../../../pages/paths";

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
  const { user, login } = useUserContext();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const {
    isLoading: isUpdatingPassword,
    status: updatePasswordStatus,
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

        updatePasswordQuery(updatePasswordData).then(() => {
          login({ email: user?.email!, password: formValues.newPassword });
          resetForm();
          navigate(PATHS.PROFILE);
        });
      } else {
        methods.setError(PasswordUpdateFields.CONFIRM_PASSWORD, {
          type: "manual",
          message: "Password must match.",
        });
      }
    },
    [methods, updatePasswordQuery, user, login, navigate, resetForm]
  );

  // error handling
  if (
    updatePasswordError &&
    updatePasswordError.id === ErrorId.INVALID_PASSWORD
  ) {
    methods.setError(PasswordUpdateFields.PASSWORD, {
      type: "manual",
      message: updatePasswordError.message,
    });
  }

  // snackbar
  useEffect(() => {
    if (updatePasswordError) {
      snackbar(updatePasswordError.message, SnackbarStatus.ERROR);
    }
    if (!isUpdatingPassword && updatePasswordStatus === Status.SUCCESS) {
      snackbar("Password saved successfully!.", SnackbarStatus.SUCCESS);
    }
  }, [snackbar, updatePasswordError, isUpdatingPassword, updatePasswordStatus]);

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    isUpdatingPassword,
  };
};
