import React from "react";
import { FormProvider } from "react-hook-form";

import { useTrainerConfigForm } from "../../../../hooks/formHooks/configuration/useTrainerConfigForm";

import {
  FormContainer,
  FormWrapper,
  FormActions,
  FormBox,
  BoxHeader,
} from "./styles/Trainer/ConfigurationForm.styles";
import {
  Name,
  Description,
  Gyms,
  Image,
} from "./views/Trainer/form/TrainerConfiguration.form";
import { Submit } from "../../../../components";

import { LeafletMap } from "./views/Trainer/map/LeafletMap";

const TrainerConfigurationForm: React.FC = () => {
  const { methods, canSubmit, onSubmit, pending } = useTrainerConfigForm();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormContainer>
        <FormWrapper>
          <FormBox>
            <BoxHeader variant="caption">Basin Information</BoxHeader>
            <Name />
            <Image />
            <Description />
          </FormBox>
          <FormBox>
            <BoxHeader variant="caption">Personal Traning</BoxHeader>
            <Gyms />
          </FormBox>
          <FormBox>
            <BoxHeader variant="caption">Map</BoxHeader>
            <LeafletMap />
          </FormBox>
        </FormWrapper>
        <FormActions>
          <Submit
            label="finish"
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

export default TrainerConfigurationForm;
