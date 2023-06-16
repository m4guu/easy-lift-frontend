import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

import { useEmailUpdateForm } from "../../../../../../hooks/formHooks/update/useEmailUpdateForm";
import { useSnackbar } from "../../../../../../hooks";

import { Submit } from "../../../../../../components";
import { ConfirmEmail, Password, UpdateEmail } from "./views/emailUpdate.form";
import { FormWrapper } from "../../../../../Auth/views/AuthForm/styles/AuthForm.styles";

import { SnackbarStatus, Status } from "../../../../../../shared/enums";

export const EmailUpdateForm: React.FC<{ currentEmail: string }> = ({
  currentEmail,
}) => {
  const {
    methods,
    onSubmit,
    isUpdatingEmail,
    updateEmailError,
    updateEmailStatus,
  } = useEmailUpdateForm();
  const { handleSubmit } = methods;

  const snackbar = useSnackbar();

  useEffect(() => {
    if (updateEmailError) {
      snackbar("Something goes wrong. Please try later.", SnackbarStatus.ERROR);
    }
    if (!isUpdatingEmail && updateEmailStatus === Status.SUCCESS) {
      snackbar(
        "Saved! Thank you for keeping us up to date.",
        SnackbarStatus.SUCCESS
      );
    }
  }, [snackbar, updateEmailError, isUpdatingEmail, updateEmailStatus]);

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
        loading={isUpdatingEmail}
        sx={{ mt: "1rem" }}
        fullWidth
      />
    </FormProvider>
  );
};

const Header = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(2.5),
  fontWeight: "bold",
}));
