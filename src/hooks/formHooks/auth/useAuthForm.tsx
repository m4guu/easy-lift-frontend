import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useCreateUserMutation } from "../../queryHooks/auth/useCreateUserMutation";

import { AuthTypes, Role } from "../../../shared/enums";
import { LoginCredentials, CreateUser } from "../../../shared/interfaces";
import { useUserContext } from "../../../contexts/userContext";

export enum AuthFormFields {
  E_MAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  ROLE = "role",
}

export interface AuthForm {
  [AuthFormFields.E_MAIL]: string;
  [AuthFormFields.PASSWORD]: string;
  [AuthFormFields.CONFIRM_PASSWORD]?: string;
  [AuthFormFields.ROLE]?: Role;
}

export const defaultValues = {
  [AuthFormFields.E_MAIL]: "",
  [AuthFormFields.PASSWORD]: "",
  [AuthFormFields.CONFIRM_PASSWORD]: "",
  [AuthFormFields.ROLE]: Role.user,
};

const authLoginSchema = yup.object().shape({
  [AuthFormFields.E_MAIL]: yup.string().email().required(),
  [AuthFormFields.PASSWORD]: yup.string().required().min(5).max(40),
});

const authSignUpSchema = yup.object().shape({
  [AuthFormFields.E_MAIL]: yup.string().email().required(),
  [AuthFormFields.PASSWORD]: yup.string().required().min(5).max(40),
  [AuthFormFields.CONFIRM_PASSWORD]: yup.string().required().min(5).max(40),
  [AuthFormFields.ROLE]: yup
    .mixed<Role>()
    .oneOf(Object.values(Role))
    .required(),
});

export const useAuthForm = (authType: AuthTypes) => {
  const [pending, setPending] = useState(false);
  const { mutateAsync: createQueryUser, error: registerError } =
    useCreateUserMutation();
  const { login } = useUserContext();

  const schema =
    authType === AuthTypes.LOGIN ? authLoginSchema : authSignUpSchema;

  const methods = useForm<AuthForm>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { email, password, confirmPassword } = watch();
  const canSubmit = email && password && confirmPassword;

  const onSubmit = useCallback(
    async (formValues: AuthForm) => {
      setPending(true);
      if (authType === AuthTypes.LOGIN) {
        const credentials: LoginCredentials = {
          email: formValues.email,
          password: formValues.password,
        };
        login(credentials);
      } else if (formValues.password === formValues.confirmPassword) {
        // create new user
        const newUser: CreateUser = {
          email: formValues.email,
          password: formValues.password,
          role: formValues.role!,
        };
        createQueryUser(newUser)
          .then(resetForm)
          .finally(() => setPending(false));
      } else {
        // todo: throw error when passwords doesnt match
      }
      setPending(false);
    },
    [authType, createQueryUser, resetForm, login]
  );

  return {
    pending,
    methods,
    onSubmit,
    canSubmit,
    resetForm,
    registerError,
  };
};
