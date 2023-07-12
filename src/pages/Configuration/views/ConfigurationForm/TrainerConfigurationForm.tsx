import React from "react";
import { FormProvider } from "react-hook-form";

import {
  TrainerConfig,
  useTrainerConfigForm,
} from "../../../../hooks/formHooks/configuration/useTrainerConfigForm";

import {
  Name,
  Description,
  Gyms,
  Image,
} from "./views/Trainer/form/TrainerConfiguration.form";
import { SectionHeader, Submit } from "../../../../components";
// import { LeafletMap } from "./views/Trainer/map/LeafletMap";
import {
  FormWrapper,
  FormBox,
  FormMapBox,
  Title,
} from "./styles/Trainer/ConfigurationForm.styles";

export const TrainerConfigurationForm: React.FC<{
  defaultValues?: TrainerConfig;
}> = ({ defaultValues }) => {
  const {
    methods,
    canSubmit,
    onSubmit,
    isUpdatingTrainer,
    selectedGyms,
    gymsChangeHandler,
  } = useTrainerConfigForm({
    defaultUpdateValues: defaultValues,
  });
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <FormBox>
          {!defaultValues && (
            <>
              <SectionHeader>configuration</SectionHeader>
              <Title variant="caption">Basin Information</Title>
            </>
          )}
          <Name />
          <Image />
          <Description />

          <Title variant="caption">Personal Traning</Title>
          <Gyms
            selectedGyms={selectedGyms}
            gymsChangeHandler={gymsChangeHandler}
          />

          <Submit
            label={defaultValues ? "update" : "finish"}
            variant="contained"
            onClick={handleSubmit((data) => onSubmit(data))}
            loading={isUpdatingTrainer}
            disabled={!canSubmit}
          />
        </FormBox>

        <FormMapBox>
          {/* // TODO: fix tests leaflet lib bug and uncomment that lines */}
          {/* <LeafletMap
            selectedGyms={selectedGyms}
            gymsChangeHandler={gymsChangeHandler}
          /> */}
        </FormMapBox>
      </FormWrapper>
    </FormProvider>
  );
};
