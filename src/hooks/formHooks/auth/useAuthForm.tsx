import { useCallback } from "react";
import { useForm } from "react-hook-form";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { AuthTypes, ErrorId, Role } from "../../../shared/enums";
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
  [AuthFormFields.CONFIRM_PASSWORD]: yup.string().required(),
  [AuthFormFields.ROLE]: yup
    .mixed<Role>()
    .oneOf(Object.values(Role))
    .required(),
});

export const useAuthForm = (authType: AuthTypes) => {
  const { login, registerUser, registerError } = useUserContext();
  const schema =
    authType === AuthTypes.LOGIN ? authLoginSchema : authSignUpSchema;

  const methods = useForm<AuthForm>({
    defaultValues,
    reValidateMode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { watch, reset, setValue, setError } = methods;

  // reset form expect email
  const resetForm = useCallback(() => {
    const registeredEmail = watch(AuthFormFields.E_MAIL);
    reset();
    setValue(AuthFormFields.E_MAIL, registeredEmail);
  }, [reset, watch, setValue]);

  const { email, password, confirmPassword } = watch();
  const canSubmit = email && password && confirmPassword;

  const onSubmit = useCallback(
    async (formValues: AuthForm) => {
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

        registerUser(newUser).then(resetForm);
      } else {
        setError(AuthFormFields.CONFIRM_PASSWORD, {
          type: "manual",
          message: "Password must match.",
        });
      }
    },
    [authType, login, registerUser, resetForm, setError]
  );

  // assigned email error
  if (registerError && registerError.id === ErrorId.EMAIL_ALREADY_ASSIGNED) {
    setError(AuthFormFields.E_MAIL, {
      type: "manual",
      message: registerError.message,
    });
  }

  return {
    methods,
    onSubmit,
    canSubmit,
    resetForm,
  };
};
