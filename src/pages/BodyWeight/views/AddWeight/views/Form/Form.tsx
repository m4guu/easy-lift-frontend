import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { styled } from "@mui/system";

import { useBodyWeightUpdate } from "../../../../../../hooks/formHooks/update/useBodyWeightUpdate";
import { useSnackbar } from "../../../../../../hooks";

import { BodyWeight } from "./views/BodyWeightUpdate.form";
import { Submit } from "../../../../../../components";
import { SnackbarStatus, Status } from "../../../../../../shared/enums";

export const Form: React.FC = () => {
  const {
    methods,
    canSubmit,
    onSubmit,
    isUpdatingWeight,
    updateWeightError,
    updateWeightStatus,
  } = useBodyWeightUpdate();
  const { handleSubmit } = methods;

  const snackbar = useSnackbar();

  useEffect(() => {
    if (updateWeightError) {
      snackbar("Something goes wrong. Please try later.", SnackbarStatus.ERROR);
    }
    if (!isUpdatingWeight && updateWeightStatus === Status.SUCCESS) {
      snackbar("Weight saved successfully!.", SnackbarStatus.SUCCESS);
    }
  }, [snackbar, updateWeightError, isUpdatingWeight, updateWeightStatus]);

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
