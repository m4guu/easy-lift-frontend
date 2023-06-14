import React from "react";
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

export const UserConfigurationForm: React.FC<{
  defaultValues?: UserConfig;
}> = ({ defaultValues }) => {
  const { methods, canSubmit, onSubmit, pending } = useUserConfigForm({
    defaultUpdateValues: defaultValues,
  });
  const { handleSubmit } = methods;

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
            loading={pending}
            disabled={!canSubmit}
          />
        </FormActions>
      </FormContainer>
    </FormProvider>
  );
};
