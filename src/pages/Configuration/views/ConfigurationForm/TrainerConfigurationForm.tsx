import React from "react";
import { FormProvider } from "react-hook-form";

import { Box, Typography } from "@mui/material";

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
} from "./views/Trainer/TrainerConfiguration.form";
import { Submit } from "../../../../components";

import map from "../../../../assets/images/dummy_map.png";

const TrainerConfigurationForm: React.FC = () => {
  const { methods, canSubmit, onSubmit, pending } = useTrainerConfigForm();
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log(errors);

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
            <img
              src={map}
              alt="map"
              style={{ width: "50vh", height: "50vh" }}
            />
          </FormBox>
        </FormWrapper>
        <FormActions>
          <Submit
            label="configurate"
            variant="contained"
            onClick={handleSubmit((data) => onSubmit(data))}
            loading={pending}
            disabled={!canSubmit}
            fullWidth
          />
        </FormActions>
      </FormContainer>
    </FormProvider>
  );
};

export default TrainerConfigurationForm;
