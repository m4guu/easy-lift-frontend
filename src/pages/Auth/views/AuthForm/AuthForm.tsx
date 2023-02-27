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
import Submit from "./views/FormActions/Submit";

type AuthFormProps = {
  isLogin: boolean;
};

export const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const { methods, onSubmit, pending } = useAuthForm(isLogin);

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <InputWrapper>
          <AuthEmail />
          <AuthPassword />
        </InputWrapper>

        {!isLogin && (
          <InputWrapper>
            <ConfirmPassword />
            <AuthRole />
          </InputWrapper>
        )}
      </FormWrapper>

      <FormActions>
        <Submit
          label={isLogin ? "Login" : "Create Account"}
          variant="outlined"
          onClick={handleSubmit((data) => onSubmit(data))}
          loading={pending}
        />
      </FormActions>
    </FormProvider>
  );
};
