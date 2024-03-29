import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useUserContext } from "../../../contexts/userContext";
import { useUpdateEmailMutation } from "../../queryHooks/auth/useUpdateEmailMutation";
import useSnackbar from "../../useSnackbar";

import { UpdateEmailData } from "../../../shared/interfaces";
import { ErrorId, SnackbarStatus, Status } from "../../../shared/enums";
import { PATHS } from "../../../pages/paths";

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
  const { user, login } = useUserContext();
  const navigate = useNavigate();
  const snackbar = useSnackbar();

  const {
    isLoading: isUpdatingEmail,
    error: updateEmailError,
    status: updateEmailStatus,
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
        updateEmailQuery(updateEmailData).then(() => {
          login({ email: formValues.email, password: formValues.password });
          resetForm();
          navigate(PATHS.PROFILE);
        });
      } else {
        methods.setError(EmailUpdateFields.CONFIRM_EMAIL, {
          type: "manual",
          message: "Emails must match.",
        });
      }
    },
    [methods, updateEmailQuery, user, resetForm, navigate, login]
  );

  // error handling
  if (updateEmailError && updateEmailError.id === ErrorId.INVALID_PASSWORD) {
    methods.setError(EmailUpdateFields.PASSWORD, {
      type: "manual",
      message: updateEmailError.message,
    });
  }

  // snackbar
  useEffect(() => {
    if (updateEmailError) {
      snackbar(updateEmailError.message, SnackbarStatus.ERROR);
    }
    if (!isUpdatingEmail && updateEmailStatus === Status.SUCCESS) {
      snackbar(
        "Saved! Thank you for keeping us up to date.",
        SnackbarStatus.SUCCESS
      );
    }
  }, [snackbar, updateEmailError, isUpdatingEmail, updateEmailStatus]);

  return {
    methods,
    canSubmit,
    onSubmit,
    resetForm,
    isUpdatingEmail,
  };
};
