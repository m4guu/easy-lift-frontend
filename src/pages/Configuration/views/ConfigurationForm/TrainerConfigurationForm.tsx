import React, { useState } from "react";
import { FormProvider } from "react-hook-form";

import {
  TrainerConfigFields,
  useTrainerConfigForm,
} from "../../../../hooks/formHooks/configuration/useTrainerConfigForm";

import {
  FormContainer,
  FormWrapper,
  FormActions,
  FormBox,
  FormMapBox,
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
  const [selectedGyms, setSelectedGyms] = useState<string[]>([]);

  const { methods, canSubmit, onSubmit, pending } = useTrainerConfigForm();
  const { handleSubmit, setValue } = methods;

  const gymsChangeHandler = (
    newSelectedGyms: string[],
    selectedGym: string
  ) => {
    const isSelected = selectedGyms.filter((gym) => gym === selectedGym);

    if (isSelected.length !== 0) {
      const filteredGyms = selectedGyms.filter((gym) => gym !== selectedGym);
      // remove existing gym
      setSelectedGyms(filteredGyms);
      // update form field
      setValue(TrainerConfigFields.GYMS, filteredGyms);
    } else {
      // add existing gym
      setSelectedGyms(newSelectedGyms);
      // update form field
      setValue(TrainerConfigFields.GYMS, newSelectedGyms);
    }
  };

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
            <Gyms
              selectedGyms={selectedGyms}
              gymsChangeHandler={gymsChangeHandler}
            />
          </FormBox>
          <FormMapBox>
            <BoxHeader variant="caption">Map</BoxHeader>
            <LeafletMap
              selectedGyms={selectedGyms}
              gymsChangeHandler={gymsChangeHandler}
            />
          </FormMapBox>
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
