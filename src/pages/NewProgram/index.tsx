import { useParams } from "react-router-dom";

import { Step, StepLabel, Alert, Box } from "@mui/material";

import { useFormSteps } from "../../hooks/formHooks/formStepHook/useFormSteps";
import { useProgram } from "../../hooks/queryHooks/programsHooks/useProgram";

import { steps } from "./views/ProgramFormProvider/constans";
import { FormStepper } from "./views/ProgramFormProvider/styles/ProgramForm.styles";

import { Status } from "../../shared/enums";
import { ProgramFormProvider } from "./views/ProgramFormProvider/ProgramFormProvider";
import { SectionHeader, SectionContainer } from "../../components";

const NewProgramPage: React.FC = () => {
  const { programId: editProgramId } = useParams();
  const { status, error, data: editProgram } = useProgram(editProgramId);

  const { currentStep } = useFormSteps();

  return (
    <SectionContainer>
      <SectionHeader>
        {status !== Status.LOADING && !editProgram ? "New" : "update"} Training
        Program
      </SectionHeader>

      {status !== Status.LOADING && !editProgram && (
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

      {editProgramId &&
      status === Status.SUCCESS &&
      editProgram?.length === 0 ? (
        <Alert variant="outlined" severity="info">
          There are no program with provided id. Try again later.
        </Alert>
      ) : (
        <Box>
          {status !== Status.LOADING && (
            <ProgramFormProvider editProgram={editProgram?.at(0)} />
          )}
        </Box>
      )}

      {status === Status.LOADING && <Box>loading...</Box>}
    </SectionContainer>
  );
};

const NewProgram = NewProgramPage;
export default NewProgram;
