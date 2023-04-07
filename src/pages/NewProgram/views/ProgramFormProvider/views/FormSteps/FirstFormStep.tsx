import React from "react";

import { FirstFormStepWrapper } from "../../styles/ProgramForm.styles";
import {
  ProgramLength,
  ProgramFrequency,
  ProgramLevel,
} from "../ProgramForm/Program.form";

export const FirstFormStep: React.FC = () => {
  return (
    <FirstFormStepWrapper>
      <ProgramLength />
      <ProgramFrequency />
      <ProgramLevel />
    </FirstFormStepWrapper>
  );
};
