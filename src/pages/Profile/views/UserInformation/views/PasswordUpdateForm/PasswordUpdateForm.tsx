import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { usePasswordUpdateForm } from "../../../../../../hooks/formHooks/update/usePasswordUpdateForm";

import { useSnackbar } from "../../../../../../hooks";

import {
  NewPassword,
  ConfirmPassword,
  Password,
} from "./views/passwordUpdate.form";
import { Submit } from "../../../../../../components";

import { FormWrapper } from "../../../../../Auth/views/AuthForm/styles/AuthForm.styles";

import { SnackbarStatus } from "../../../../../../shared/enums";

export const PasswordUpdateForm: React.FC = () => {
  const { methods, onSubmit, updatePasswordError, isUpdatingPassword } =
    usePasswordUpdateForm();
  const { handleSubmit } = methods;

  const snackbar = useSnackbar();

  useEffect(() => {
    if (updatePasswordError) {
      snackbar(updatePasswordError.message, SnackbarStatus.ERROR);
    }
  }, [snackbar, updatePasswordError]);

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <NewPassword />
        <ConfirmPassword />
        <Password />
      </FormWrapper>

      <Submit
        label="update password"
        variant="outlined"
        onClick={handleSubmit((data) => onSubmit(data))}
        loading={isUpdatingPassword}
        sx={{ mt: "1rem" }}
        fullWidth
      />
    </FormProvider>
  );
};
