import React, { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";

import {
  TrainerConfig,
  TrainerConfigFields,
  useTrainerConfigForm,
} from "../../../../hooks/formHooks/configuration/useTrainerConfigForm";

import {
  FormWrapper,
  FormBox,
  FormMapBox,
  Title,
} from "./styles/Trainer/ConfigurationForm.styles";
import {
  Name,
  Description,
  Gyms,
  Image,
} from "./views/Trainer/form/TrainerConfiguration.form";
import { SectionHeader, Submit } from "../../../../components";

import { LeafletMap } from "./views/Trainer/map/LeafletMap";

import { Gym } from "../../../../shared/interfaces";
import { useSnackbar } from "../../../../hooks";
import { SnackbarStatus, Status } from "../../../../shared/enums";

// ! comment leafletmap to dont up unnessesery database requests
export const TrainerConfigurationForm: React.FC<{
  defaultValues?: TrainerConfig;
}> = ({ defaultValues }) => {
  const [selectedGyms, setSelectedGyms] = useState<Gym[]>([]);

  const {
    methods,
    canSubmit,
    onSubmit,
    updateTrainerStatus,
    updateTrainerError,
    isUpdatingTrainer,
  } = useTrainerConfigForm({
    defaultUpdateValues: defaultValues,
  });
  const { handleSubmit, setValue } = methods;
  const snackbar = useSnackbar();

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

  useEffect(() => {
    if (updateTrainerError) {
      snackbar("Something goes wrong. Please try later.", SnackbarStatus.ERROR);
    }
    if (!isUpdatingTrainer && updateTrainerStatus === Status.SUCCESS) {
      snackbar(
        "Saved! Thank you for keeping us up to date.",
        SnackbarStatus.SUCCESS
      );
    }
  }, [snackbar, updateTrainerError, isUpdatingTrainer, updateTrainerStatus]);

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
          <LeafletMap
            selectedGyms={selectedGyms}
            gymsChangeHandler={gymsChangeHandler}
          />
        </FormMapBox>
      </FormWrapper>
    </FormProvider>
  );
};
