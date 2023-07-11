import React from "react";
import { FormProvider } from "react-hook-form";

import { Step, StepLabel, Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useNewProgramForm } from "../../../../hooks/formHooks/program/useNewProgramForm";
import { useFormSteps } from "../../../../hooks/formHooks/formStepHook/useFormSteps";

import { Program as ProgramInterface } from "../../../../shared/interfaces";

import { steps } from "./constans";
import {
  FormWrapper,
  FormActions,
  FormStepper,
} from "./styles/ProgramForm.styles";
import { ErrorMessage, Submit } from "../../../../components";
import { FirstFormStep } from "./views/FormSteps/FirstFormStep";
import { SecondFormStep } from "./views/FormSteps/SecondFormStep";
import { ThirdFormStep } from "./views/FormSteps/ThirdFormStep";
import { API_URL } from "../../../../config/env/env.config";

export const ProgramFormProvider: React.FC<{
  editProgram?: ProgramInterface;
}> = ({ editProgram }) => {
  const {
    methods,
    appendProgramField,
    removeProgramField,
    isAddingNewProgram,
    isUpdatingProgram,
    programFields,
    canSubmit,
    onSubmit,
  } = useNewProgramForm({ editProgram });
  const { currentStep, nextStep } = useFormSteps(!!editProgram);

  const {
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  const initImagePreview =
    editProgram && editProgram.image
      ? `${API_URL}${editProgram.image}`
      : undefined;

  return (
    <FormProvider {...methods}>
      {!editProgram && (
        <FormStepper activeStep={currentStep - 1} alternativeLabel>
          {steps.map((step) => {
            return (
              <Step key={step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            );
          })}
        </FormStepper>
      )}

      <FormWrapper>
        {currentStep === 1 && <FirstFormStep />}
        {currentStep === 2 && (
          <SecondFormStep
            programFields={programFields}
            appendProgram={appendProgramField}
            removeProgram={removeProgramField}
          />
        )}
        {currentStep === 3 && (
          <ThirdFormStep initImagePreview={initImagePreview} />
        )}

        {errors?.program && currentStep === 2 && (
          <ErrorMessage>
            Enter all workouts to proceed to the next step!
          </ErrorMessage>
        )}

        <FormActions>
          {currentStep === 3 ? (
            // try submit form
            <Submit
              onClick={handleSubmit((data) => onSubmit(data))}
              disabled={!canSubmit}
              variant="outlined"
              loading={isAddingNewProgram || isUpdatingProgram}
              label={editProgram ? "update program" : "create program"}
              color={editProgram ? "info" : "primary"}
            />
          ) : (
            // next step
            <Button
              onClick={() => nextStep(trigger)}
              endIcon={<NavigateNextIcon />}
              variant="outlined"
            >
              next step
            </Button>
          )}
        </FormActions>
      </FormWrapper>
    </FormProvider>
  );
};
