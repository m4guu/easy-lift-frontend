import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserContext } from "../../../contexts/userContext";

export enum PasswordUpdateFields {
  NEW_PASSWORD = "newPassword",
  CONFIRM_PASSWORD = "confirmPassword",
  PASSWORD = "password",
}

export interface PasswordUpdate {
  [PasswordUpdateFields.NEW_PASSWORD]: string;
  [PasswordUpdateFields.CONFIRM_PASSWORD]: string;
  [PasswordUpdateFields.PASSWORD]: string;
}

const defaultValues = {
  [PasswordUpdateFields.NEW_PASSWORD]: "",
  [PasswordUpdateFields.CONFIRM_PASSWORD]: "",
  [PasswordUpdateFields.PASSWORD]: "",
};

const schema = yup.object().shape({
  [PasswordUpdateFields.NEW_PASSWORD]: yup.string().required().min(5).max(40),
  [PasswordUpdateFields.CONFIRM_PASSWORD]: yup
    .string()
    .required()
    .min(5)
    .max(40),
  [PasswordUpdateFields.PASSWORD]: yup.string().required().min(5).max(40),
});

export const usePasswordUpdateForm = () => {
  const { user } = useUserContext();

  const methods = useForm<PasswordUpdate>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { newPassword, confirmPassword, password } = watch();
  const canSubmit = newPassword && confirmPassword && password;

  const onSubmit = useCallback((formValues: PasswordUpdate) => {
    if (formValues.newPassword === formValues.confirmPassword) {
      // try update password
      console.log(formValues);
    } else {
      // todo: handle error
      alert("confirm password doesnt match");
    }
  }, []);

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
  };
};
