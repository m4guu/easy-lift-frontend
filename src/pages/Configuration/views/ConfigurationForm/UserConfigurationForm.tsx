import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import {
  UserConfig,
  useUserConfigForm,
} from "../../../../hooks/formHooks/configuration/useUserConfigForm";

import {
  Name,
  Height,
  Weight,
  Image,
} from "./views/User/UserConfiguration.form";
import {
  FormContainer,
  FormWrapper,
  FormActions,
} from "./styles/User/ConfigurationForm.styles";
import { SectionHeader, Submit } from "../../../../components";
import { useSnackbar } from "../../../../hooks";
import { SnackbarStatus, Status } from "../../../../shared/enums";

export const UserConfigurationForm: React.FC<{
  defaultValues?: UserConfig;
}> = ({ defaultValues }) => {
  const {
    methods,
    canSubmit,
    onSubmit,
    updateUserStatus,
    isUpdatingUser,
    updateUserError,
  } = useUserConfigForm({
    defaultUpdateValues: defaultValues,
  });
  const { handleSubmit } = methods;

  const snackbar = useSnackbar();

  useEffect(() => {
    if (updateUserError) {
      snackbar(updateUserError.message, SnackbarStatus.ERROR);
    }
    if (!isUpdatingUser && updateUserStatus === Status.SUCCESS) {
      snackbar(
        "Saved! Thank you for keeping us up to date.",
        SnackbarStatus.SUCCESS
      );
    }
  }, [snackbar, updateUserError, isUpdatingUser, updateUserStatus]);

  return (
    <FormProvider {...methods}>
      {!defaultValues && <SectionHeader>configuration</SectionHeader>}
      <FormContainer>
        <FormWrapper>
          <Name />
          <Image />
          <Height />
          <Weight />
        </FormWrapper>

        <FormActions>
          <Submit
            label={defaultValues ? "update" : "configurate"}
            variant="contained"
            onClick={handleSubmit((data) => onSubmit(data))}
            loading={isUpdatingUser}
            disabled={!canSubmit}
          />
        </FormActions>
      </FormContainer>
    </FormProvider>
  );
};
