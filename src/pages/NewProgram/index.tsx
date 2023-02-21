import React from "react";
import { FormProvider, useFieldArray } from "react-hook-form";

import { Button, Stepper, Step, StepLabel } from "@mui/material";

import { useNewProgramForm } from "../../hooks/formHooks/program/useNewProgramForm";
import { useFormSteps } from "../../hooks/formHooks/formStepHook/useFormSteps";

import {
  FormWrapper,
  FirstFormStepWrapper,
  SecondFormStepWrapper,
  ThirdFormStepWrapper,
  FormActions,
  FormStepper,
} from "./styles/NewProgram.styles";
import { SectionHeader, SectionContainer } from "../../components";
import {
  ProgramTitle,
  ProgramLevel,
  ProgramFrequency,
  ProgramLength,
  Program,
  ProgramPrice,
  ProgramDescription,
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
  } = useNewProgramForm();
  const { currentStep, nextStep, prevStep } = useFormSteps();

  const {
    watch,
    trigger,
    handleSubmit,
    formState: { errors },
  } = methods;

  const programLength = watch("programLength");
  const programFrequency = watch("frequency");
  console.log(errors);

  return (
    <SectionContainer>
      <SectionHeader>New Training Program</SectionHeader>

      <FormStepper activeStep={currentStep - 1}>
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
              <ProgramPrice />
              <ProgramDescription />
            </ThirdFormStepWrapper>
          )}

          <FormActions>
            {currentStep !== 1 && <Button onClick={prevStep}>prev step</Button>}
            {currentStep !== 3 && (
              <Button onClick={() => nextStep(trigger)}>next step</Button>
            )}
            {currentStep === 3 && (
              <Button
                onClick={handleSubmit((data) => onSubmit(data))}
                disabled={!canSubmit}
              >
                create program
              </Button>
            )}
          </FormActions>
        </FormWrapper>
      </FormProvider>
    </SectionContainer>
  );
};

const NewProgram = NewProgramPage;
export default NewProgram;
