import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { useAuthForm } from "../../../../hooks/formHooks/auth/useAuthForm";

import { FormWrapper, FormActions } from "./styles/AuthForm.styles";
import {
  AuthEmail,
  AuthPassword,
  ConfirmPassword,
  AuthRole,
} from "./views/Auth.form/Auth.form";
import { Submit } from "../../../../components";
import { AuthTypes, Status } from "../../../../shared/enums";
import { useUserContext } from "../../../../contexts/userContext";

type AuthFormProps = {
  authType: AuthTypes;
  setTab: React.Dispatch<React.SetStateAction<number>>;
};

export const AuthForm: React.FC<AuthFormProps> = ({ authType, setTab }) => {
  const { methods, onSubmit } = useAuthForm(authType);
  const { handleSubmit } = methods;
  const { isLogging, isRegistering, registerStatus } = useUserContext();

  // change to a login tab after successful registration
  useEffect(() => {
    if (!isRegistering && registerStatus === Status.SUCCESS) {
      setTab(0);
    }
  }, [isRegistering, registerStatus, setTab]);

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
          onClick={handleSubmit((data) => onSubmit(data))}
          loading={isRegistering || isLogging}
        />
      </FormActions>
    </FormProvider>
  );
};
