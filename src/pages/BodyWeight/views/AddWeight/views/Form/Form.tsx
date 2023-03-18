import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useSnackbar } from "notistack";

import { styled } from "@mui/system";

import { useBodyWeightUpdate } from "../../../../../../hooks/formHooks/update/useBodyWeightUpdate";

import { BodyWeight } from "./views/BodyWeightUpdate.form";
import { Submit } from "../../../../../../components";

export const Form: React.FC = () => {
  const { methods, canSubmit, onSubmit, pending } = useBodyWeightUpdate();
  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSubmitSuccessful) {
      enqueueSnackbar("Body weight updated successfuly !", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
  }, [enqueueSnackbar, isSubmitSuccessful]);

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
