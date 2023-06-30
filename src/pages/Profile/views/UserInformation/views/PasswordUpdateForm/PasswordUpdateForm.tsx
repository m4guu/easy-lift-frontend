import React from "react";
import { FormProvider } from "react-hook-form";

import { usePasswordUpdateForm } from "../../../../../../hooks/formHooks/update/usePasswordUpdateForm";

import {
  NewPassword,
  ConfirmPassword,
  Password,
} from "./views/passwordUpdate.form";
import { Submit } from "../../../../../../components";

import { FormWrapper } from "../../../../../Auth/views/AuthForm/styles/AuthForm.styles";

export const PasswordUpdateForm: React.FC = () => {
  const { methods, onSubmit, isUpdatingPassword } = usePasswordUpdateForm();
  const { handleSubmit } = methods;

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
