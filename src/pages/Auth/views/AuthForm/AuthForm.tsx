import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useAuthForm } from "../../../../hooks/formHooks/auth/useAuthForm";
import { useSnackbar } from "../../../../hooks";

import { FormWrapper, FormActions } from "./styles/AuthForm.styles";
import {
  AuthEmail,
  AuthPassword,
  ConfirmPassword,
  AuthRole,
} from "./views/Auth.form/Auth.form";
import { Submit } from "../../../../components";
import { AuthTypes, SnackbarStatus } from "../../../../shared/enums";

type AuthFormProps = {
  authType: AuthTypes;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

export const AuthForm: React.FC<AuthFormProps> = ({ authType, setTab }) => {
  const snackbar = useSnackbar();

  const { methods, onSubmit, pending, registerError } = useAuthForm(authType);
  const { handleSubmit } = methods;

  useEffect(() => {
    if (registerError) {
      snackbar(
        `We're sorry! The server encountered an internal error. Please try later.`,
        SnackbarStatus.ERROR
      );
    }
  }, [snackbar, registerError]);

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <AuthEmail />
        <AuthPassword />

        {authType === AuthTypes.SIGN_UP && (
          <>
            <ConfirmPassword />
            <AuthRole />
          </>
        )}
      </FormWrapper>

      <FormActions>
        <Submit
          label={authType === AuthTypes.LOGIN ? "Login" : "Create Account"}
          variant="outlined"
          onClick={handleSubmit((data) => onSubmit(data).then(() => setTab(0)))}
          loading={pending}
        />
      </FormActions>
    </FormProvider>
  );
};
