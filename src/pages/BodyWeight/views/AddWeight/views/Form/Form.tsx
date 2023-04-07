import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { styled } from "@mui/system";

import { useBodyWeightUpdate } from "../../../../../../hooks/formHooks/update/useBodyWeightUpdate";
import { useSnackbar } from "../../../../../../hooks";

import { BodyWeight } from "./views/BodyWeightUpdate.form";
import { Submit } from "../../../../../../components";
import { SnackbarStatus } from "../../../../../../shared/enums";

export const Form: React.FC = () => {
  const { methods, canSubmit, onSubmit, pending } = useBodyWeightUpdate();
  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  const snackbar = useSnackbar();

  useEffect(() => {
    if (isSubmitSuccessful) {
      snackbar("Body weight updated successfuly !", SnackbarStatus.SUCCESS);
    }
  }, [snackbar, isSubmitSuccessful]);

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
        loading={pending}
        disabled={!canSubmit}
        color="info"
      />
    </FormProvider>
  );
};

const FormWrapper = styled("form")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
