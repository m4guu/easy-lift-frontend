import React from "react";
import {
  useFormContext,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form";

import { SecondFormStepWrapper } from "../../styles/ProgramForm.styles";
import { Program } from "../ProgramForm/Program.form";
import {
  AddProgramFormFields,
  AddProgramForm,
} from "../../../../../../hooks/formHooks/program/useNewProgramForm";
import { ProgramItem } from "../../../../../../shared/interfaces";

interface SecondFormStepProps {
  programFields: ProgramItem[];
  appendProgram: UseFieldArrayAppend<
    AddProgramForm,
    AddProgramFormFields.PROGRAM
  >;
  removeProgram: UseFieldArrayRemove;
}

export const SecondFormStep: React.FC<SecondFormStepProps> = ({
  programFields,
  appendProgram,
  removeProgram,
}) => {
  const { watch } = useFormContext();
  const programLength = watch(AddProgramFormFields.PROGRAM_LENGTH);
  const programFrequency = watch(AddProgramFormFields.FREQUENCY_PER_WEEK);

  return (
    <SecondFormStepWrapper>
      <Program
        programLength={programLength}
        programFrequency={programFrequency}
        programFields={programFields}
        appendProgram={appendProgram}
        removeProgram={removeProgram}
      />
    </SecondFormStepWrapper>
  );
};
