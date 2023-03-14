import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";

import { Snackbar, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { useBodyWeightUpdate } from "../../../../../../hooks/formHooks/update/useBodyWeightUpdate";

import { BodyWeight } from "./views/BodyWeightUpdate.form";
import { Submit } from "../../../../../../components";

export const Form: React.FC = () => {
  const [isUpdated, setIsUpdated] = useState(false);

  const { methods, canSubmit, onSubmit, pending } = useBodyWeightUpdate();
  const {
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsUpdated(true);
    }
  }, [isSubmitSuccessful]);

  return (
    <FormProvider {...methods}>
      {isUpdated ? (
        <Alert>Body weight updated successfuly.</Alert>
      ) : (
        <>
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
        </>
      )}
    </FormProvider>
  );
};

const FormWrapper = styled("form")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
