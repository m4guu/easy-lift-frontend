import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import {
  TrainerConfig,
  useTrainerConfigForm,
} from "../../../../hooks/formHooks/configuration/useTrainerConfigForm";
import { useSnackbar } from "../../../../hooks";

import {
  Name,
  Description,
  Gyms,
  Image,
} from "./views/Trainer/form/TrainerConfiguration.form";
import { SectionHeader, Submit } from "../../../../components";
import { LeafletMap } from "./views/Trainer/map/LeafletMap";
import {
  FormWrapper,
  FormBox,
  FormMapBox,
  Title,
} from "./styles/Trainer/ConfigurationForm.styles";

import { SnackbarStatus, Status } from "../../../../shared/enums";

// ! comment leafletmap to dont up unnessesery database requests
export const TrainerConfigurationForm: React.FC<{
  defaultValues?: TrainerConfig;
}> = ({ defaultValues }) => {
  const {
    methods,
    canSubmit,
    onSubmit,
    updateTrainerStatus,
    updateTrainerError,
    isUpdatingTrainer,
    selectedGyms,
    gymsChangeHandler,
  } = useTrainerConfigForm({
    defaultUpdateValues: defaultValues,
  });
  const { handleSubmit } = methods;
  const snackbar = useSnackbar();

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
