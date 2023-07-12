import React from "react";
import { FormProvider } from "react-hook-form";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { useBodyWeightUpdate } from "../../../../hooks/formHooks/update/useBodyWeightUpdate";

import { BodyWeight } from "./views/BodyWeightUpdate.form";
import { Submit } from "../../../../components";

export const AddWeight: React.FC = () => {
  const { methods, canSubmit, onSubmit, isUpdatingWeight } =
    useBodyWeightUpdate();
  const { handleSubmit } = methods;
  return (
    <Container>
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
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  position: "relative",
  textAlign: "center",
  padding: theme.spacing(2),
  margin: `${theme.spacing(2)} -${theme.spacing(2)} `,
  borderTop: `thin solid ${theme.palette.primary.main}`,
  borderBottom: `thin solid ${theme.palette.primary.main}`,
}));

const FormWrapper = styled("form")(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
