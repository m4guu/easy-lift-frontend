import React from "react";

import { ThirdFormStepWrapper } from "../../styles/ProgramForm.styles";
import {
  ProgramTitle,
  Image,
  ProgramPrice,
  ProgramDescription,
} from "../ProgramForm/Program.form";

export const ThirdFormStep: React.FC<{
  initImagePreview: string | undefined;
}> = ({ initImagePreview }) => {
  return (
    <ThirdFormStepWrapper>
      <ProgramTitle />
      <Image initImagePreview={initImagePreview} />
      <ProgramPrice />
      <ProgramDescription />
    </ThirdFormStepWrapper>
  );
};
