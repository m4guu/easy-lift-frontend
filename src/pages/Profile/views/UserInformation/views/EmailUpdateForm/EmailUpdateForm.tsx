import React from "react";
import { FormProvider } from "react-hook-form";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useEmailUpdateForm } from "../../../../../../hooks/formHooks/update/useEmailUpdateForm";

import { ConfirmEmail, Password, UpdateEmail } from "./views/emailUpdate.form";
import { FormWrapper } from "../../../../../Auth/views/AuthForm/styles/AuthForm.styles";

import { Submit } from "../../../../../../components";

export const EmailUpdateForm: React.FC<{ currentEmail: string }> = ({
  currentEmail,
}) => {
  const { methods, onSubmit } = useEmailUpdateForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <Header>
        Current e-mail address
        <Typography>{currentEmail}</Typography>
      </Header>

      <FormWrapper>
        <UpdateEmail />
        <ConfirmEmail />
        <Password />
      </FormWrapper>

      <Submit
        label="update email"
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

const Header = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
  fontWeight: "bold",
}));
