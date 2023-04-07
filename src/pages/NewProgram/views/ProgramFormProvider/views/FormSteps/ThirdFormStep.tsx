import React from "react";

import { ThirdFormStepWrapper } from "../../styles/ProgramForm.styles";
import {
  ProgramTitle,
  Image,
  ProgramPrice,
  ProgramDescription,
} from "../ProgramForm/Program.form";

export const ThirdFormStep: React.FC = () => {
  return (
    <ThirdFormStepWrapper>
      <ProgramTitle />
      <Image />
      <ProgramPrice />
      <ProgramDescription />
    </ThirdFormStepWrapper>
  );
};
