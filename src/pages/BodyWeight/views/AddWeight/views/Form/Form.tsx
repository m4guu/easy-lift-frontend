import React from "react";
import { FormProvider } from "react-hook-form";

import { styled } from "@mui/system";

import { useBodyWeightUpdate } from "../../../../../../hooks/formHooks/update/useBodyWeightUpdate";

import { BodyWeight } from "./views/BodyWeightUpdate.form";
import { Submit } from "../../../../../../components";

export const Form: React.FC = () => {
  const { methods, canSubmit, onSubmit, isUpdatingWeight } =
    useBodyWeightUpdate();
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <BodyWeight />
      </FormWrapper>

      <Submit
        label="update"
        variant="outlined"
        size="small"
        onClick={handleSubmit((data) => onSubmit(data))}
        loading={isUpdatingWeight}
        disabled={!canSubmit}
        color="info"
      />
    </FormProvider>
  );
};

const FormWrapper = styled("form")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
