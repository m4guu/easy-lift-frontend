import React from "react";
import { FormProvider } from "react-hook-form";

import { Typography } from "@mui/material";
import { styled } from "@mui/system";

import { usePasswordUpdateForm } from "../../../../../../hooks/formHooks/update/usePasswordUpdateForm";

import {
  NewPassword,
  ConfirmPassword,
  Password,
} from "./views/passwordUpdate.form";
import { FormWrapper } from "../../../../../Auth/views/AuthForm/styles/AuthForm.styles";

import { Submit } from "../../../../../../components";

export const PasswordUpdateForm: React.FC = () => {
  const { methods, onSubmit } = usePasswordUpdateForm();
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
        // todo: handle loading when query will be added
        loading={false}
        sx={{ mt: "1rem" }}
        fullWidth
      />
    </FormProvider>
  );
};
