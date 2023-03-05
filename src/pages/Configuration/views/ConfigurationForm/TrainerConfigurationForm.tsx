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

import { Gym } from "../../../../shared/interfaces";

const TrainerConfigurationForm: React.FC = () => {
  const [selectedGyms, setSelectedGyms] = useState<Gym[]>([]);

  const { methods, canSubmit, onSubmit, pending } = useTrainerConfigForm();
  const { handleSubmit, setValue } = methods;

  const removeGym = (gym: Gym) => {
    const updatedGyms = selectedGyms.filter(
      (selectedGym) => selectedGym.id !== gym.id
    );
    const updatedGymsIds = updatedGyms.map((updatedGym) => updatedGym.id);
    // remove existing gym
    setSelectedGyms(updatedGyms);
    // remove form field existing gym
    setValue(TrainerConfigFields.GYMS, updatedGymsIds);
  };

  const gymsChangeHandler = (selectedGym: Gym) => {
    const isSelected = !!selectedGyms.filter((gym) => gym.id === selectedGym.id)
      .length;

    if (isSelected) {
      removeGym(selectedGym);
    } else {
      const updatedGyms = [...selectedGyms, selectedGym];
      const updatedGymsIds = updatedGyms.map((updatedGym) => updatedGym.id);
      // change existing gyms
      setSelectedGyms(updatedGyms);
      // update form field gyms
      setValue(TrainerConfigFields.GYMS, updatedGymsIds);
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
              removeGym={removeGym}
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
