import React from "react";
import { FormProvider } from "react-hook-form";

import { useAuthForm } from "../../../../hooks/formHooks/auth/useAuthForm";

import {
  FormWrapper,
  InputWrapper,
  FormActions,
} from "./styles/AuthForm.styles";
import {
  AuthEmail,
  AuthPassword,
  ConfirmPassword,
  AuthRole,
} from "./views/Auth.form/Auth.form";
import { Submit } from "../../../../components";
import { AuthTypes } from "../../../../shared/enums";

type AuthFormProps = {
  authType: AuthTypes;
};

export const AuthForm: React.FC<AuthFormProps> = ({ authType }) => {
  const { methods, onSubmit, pending } = useAuthForm(authType);

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <InputWrapper>
          <AuthEmail />
          <AuthPassword />
        </InputWrapper>

        {authType === AuthTypes.SIGN_UP && (
          <InputWrapper>
            <ConfirmPassword />
            <AuthRole />
          </InputWrapper>
        )}
      </FormWrapper>

      <FormActions>
        <Submit
          label={authType === AuthTypes.LOGIN ? "Login" : "Create Account"}
          variant="outlined"
          onClick={handleSubmit((data) => onSubmit(data))}
          loading={pending}
        />
      </FormActions>
    </FormProvider>
  );
};
