import React from "react";
import { FormProvider } from "react-hook-form";

import { Button, Step, StepLabel, Alert } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import {
  useNewProgramForm,
  AddProgramFormFields,
} from "../../hooks/formHooks/program/useNewProgramForm";
import { useFormSteps } from "../../hooks/formHooks/formStepHook/useFormSteps";

import {
  FormWrapper,
  FirstFormStepWrapper,
  SecondFormStepWrapper,
  ThirdFormStepWrapper,
  FormActions,
  FormStepper,
} from "./styles/NewProgram.styles";
import {
  SectionHeader,
  SectionContainer,
  ErrorMessage,
} from "../../components";
import {
  ProgramTitle,
  ProgramLevel,
  ProgramFrequency,
  ProgramLength,
  Program,
  ProgramPrice,
  ProgramDescription,
  Image,
} from "./views/AddProgramForm/AddProgram.form";
import { steps } from "./constans";

const NewProgramPage: React.FC = () => {
  const {
    methods,
    appendProgramField,
    removeProgramField,
    programFields,
    canSubmit,
    onSubmit,
    isProgramAdded,
  } = useNewProgramForm();
  const { currentStep, nextStep } = useFormSteps();

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  const programLength = watch(AddProgramFormFields.PROGRAM_LENGTH);
  const programFrequency = watch(AddProgramFormFields.FREQUENCY_PER_WEEK);

  return (
    <SectionContainer>
      <SectionHeader>New Training Program</SectionHeader>

      {isProgramAdded ? (
        <Alert color="success">Program added successfuly.</Alert>
      ) : (
        <>
          <FormStepper activeStep={currentStep - 1} alternativeLabel>
            {steps.map((step) => {
              return (
                <Step key={step}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </FormStepper>

          <FormProvider {...methods}>
            <FormWrapper>
              {currentStep === 1 && (
                <FirstFormStepWrapper>
                  <ProgramTitle />
                  <ProgramLevel />
                  <ProgramFrequency />
                  <ProgramLength />
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
        </>
      )}
    </SectionContainer>
  );
};

const NewProgram = NewProgramPage;
export default NewProgram;
