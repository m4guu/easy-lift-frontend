import { useCallback } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserContext } from "../../../contexts/userContext";
import { useUpdateEmailMutation } from "../../queryHooks/auth/useUpdateEmailMutation";
import { UpdateEmailData } from "../../../shared/interfaces";

export enum EmailUpdateFields {
  EMAIL = "email",
  CONFIRM_EMAIL = "confirmEmail",
  PASSWORD = "password",
}

export interface EmailUpdate {
  [EmailUpdateFields.EMAIL]: string;
  [EmailUpdateFields.CONFIRM_EMAIL]: string;
  [EmailUpdateFields.PASSWORD]: string;
}

const defaultValues = {
  [EmailUpdateFields.EMAIL]: "",
  [EmailUpdateFields.CONFIRM_EMAIL]: "",
  [EmailUpdateFields.PASSWORD]: "",
};

const schema = yup.object().shape({
  [EmailUpdateFields.EMAIL]: yup.string().email().required(),
  [EmailUpdateFields.CONFIRM_EMAIL]: yup.string().email().required(),
  [EmailUpdateFields.PASSWORD]: yup.string().required().min(5).max(40),
});

export const useEmailUpdateForm = () => {
  const { user } = useUserContext();
  const {
    isLoading: isUpdatingEmail,
    error: updateEmailError,
    mutateAsync: updateEmailQuery,
  } = useUpdateEmailMutation();

  const methods = useForm<EmailUpdate>({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { watch, reset } = methods;

  const resetForm = useCallback(() => reset(), [reset]);

  const { email, confirmEmail, password } = watch();
  const canSubmit = email && confirmEmail && password;

  const onSubmit = useCallback(
    (formValues: EmailUpdate) => {
      if (formValues.email === formValues.confirmEmail) {
        const updateEmailData: UpdateEmailData = {
          userId: user?.id!,
          newEmail: formValues.email,
          password: formValues.password,
        };
        updateEmailQuery(updateEmailData);
      } else {
        methods.setError(EmailUpdateFields.CONFIRM_EMAIL, {
          type: "manual",
          message: "Emails must match.",
        });
      }
    },
    [methods, updateEmailQuery, user]
  );

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    isUpdatingEmail,
    updateEmailError,
  };
};
