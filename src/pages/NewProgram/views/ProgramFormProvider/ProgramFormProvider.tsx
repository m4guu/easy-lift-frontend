import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useSnackbar } from "notistack";

import { Button } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  useNewProgramForm,
  AddProgramFormFields,
} from "../../../../hooks/formHooks/program/useNewProgramForm";
import { useFormSteps } from "../../../../hooks/formHooks/formStepHook/useFormSteps";

import {
  FormWrapper,
  FirstFormStepWrapper,
  SecondFormStepWrapper,
  ThirdFormStepWrapper,
  FormActions,
} from "./styles/ProgramForm.styles";
import {
  ProgramTitle,
  ProgramLevel,
  ProgramFrequency,
  ProgramLength,
  Program,
  ProgramPrice,
  ProgramDescription,
  Image,
} from "./views/ProgramForm/Program.form";
import { ErrorMessage } from "../../../../components";

export const ProgramFormProvider = () => {
  const {
    methods,
    appendProgramField,
    removeProgramField,
    programFields,
    canSubmit,
    onSubmit,
  } = useNewProgramForm();
  const { currentStep, nextStep } = useFormSteps();
  const { enqueueSnackbar } = useSnackbar();

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const programLength = watch(AddProgramFormFields.PROGRAM_LENGTH);
  const programFrequency = watch(AddProgramFormFields.FREQUENCY_PER_WEEK);

  useEffect(() => {
    if (isSubmitSuccessful) {
      enqueueSnackbar("Program added successfuly.", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
  }, [enqueueSnackbar, isSubmitSuccessful]);

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        {currentStep === 1 && (
          <FirstFormStepWrapper>
            <ProgramLength />
            <ProgramFrequency />
            <ProgramLevel />
          </FirstFormStepWrapper>
        )}

        {currentStep === 2 && (
          <SecondFormStepWrapper>
            <Program
              programLength={programLength}
              programFrequency={programFrequency}
              programFields={programFields}
              appendProgram={appendProgramField}
              removeProgram={removeProgramField}
            />
          </SecondFormStepWrapper>
        )}

        {currentStep === 3 && (
          <ThirdFormStepWrapper>
            <ProgramTitle />
            <Image />
            <ProgramPrice />
            <ProgramDescription />
          </ThirdFormStepWrapper>
        )}

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
            >
              create program
            </Button>
          )}
        </FormActions>
      </FormWrapper>
    </FormProvider>
  );
};
