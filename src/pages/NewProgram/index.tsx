import { Step, StepLabel } from "@mui/material";

import { useFormSteps } from "../../hooks/formHooks/formStepHook/useFormSteps";

import { steps } from "./views/ProgramFormProvider/constans";
import { FormStepper } from "./views/ProgramFormProvider/styles/ProgramForm.styles";

import { ProgramFormProvider } from "./views/ProgramFormProvider/ProgramFormProvider";
import { SectionHeader, SectionContainer } from "../../components";

const NewProgramPage: React.FC = () => {
  const { currentStep } = useFormSteps();

  return (
    <SectionContainer>
      <SectionHeader>New Training Program</SectionHeader>

      <FormStepper activeStep={currentStep - 1} alternativeLabel>
        {steps.map((step) => {
          return (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          );
        })}
      </FormStepper>

      <ProgramFormProvider />
    </SectionContainer>
  );
};

const NewProgram = NewProgramPage;
export default NewProgram;
