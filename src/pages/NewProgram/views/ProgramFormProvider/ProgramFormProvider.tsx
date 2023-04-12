import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useNewProgramForm } from "../../../../hooks/formHooks/program/useNewProgramForm";
import { useFormSteps } from "../../../../hooks/formHooks/formStepHook/useFormSteps";
import { useSnackbar } from "../../../../hooks";

import { SnackbarStatus } from "../../../../shared/enums";
import { Program as ProgramInterface } from "../../../../shared/interfaces";

import { FormWrapper, FormActions } from "./styles/ProgramForm.styles";

import { ErrorMessage } from "../../../../components";
import { FirstFormStep } from "./views/FormSteps/FirstFormStep";
import { SecondFormStep } from "./views/FormSteps/SecondFormStep";
import { ThirdFormStep } from "./views/FormSteps/ThirdFormStep";

type ProgramFormProviderProps = {
  editProgram?: ProgramInterface;
};

export const ProgramFormProvider: React.FC<ProgramFormProviderProps> = ({
  editProgram,
}) => {
  const {
    methods,
    appendProgramField,
    removeProgramField,
    programFields,
    canSubmit,
    onSubmit,
  } = useNewProgramForm({ editProgram });
  const { currentStep, nextStep } = useFormSteps(!!editProgram);
  const snackbar = useSnackbar();

  const {
    trigger,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      snackbar("Program added successfuly.", SnackbarStatus.SUCCESS);
    }
  }, [snackbar, isSubmitSuccessful]);

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        {currentStep === 1 && <FirstFormStep />}
        {currentStep === 2 && (
          <SecondFormStep
            programFields={programFields}
            appendProgram={appendProgramField}
            removeProgram={removeProgramField}
          />
        )}
        {currentStep === 3 && <ThirdFormStep />}

        {errors?.program && currentStep === 2 && (
          <ErrorMessage>
            Enter all workouts to proceed to the next step!
          </ErrorMessage>
        )}

        <FormActions>
          {currentStep !== 3 && (
            <Button
              onClick={() => nextStep(trigger)}
              endIcon={<NavigateNextIcon />}
              variant="outlined"
            >
              next step
            </Button>
          )}
          {currentStep === 3 && (
            <Button
              onClick={handleSubmit((data) => onSubmit(data))}
              disabled={!canSubmit}
              variant="outlined"
              color={editProgram ? "info" : "primary"}
            >
              {editProgram ? "update" : "create"} program
            </Button>
          )}
        </FormActions>
      </FormWrapper>
    </FormProvider>
  );
};
