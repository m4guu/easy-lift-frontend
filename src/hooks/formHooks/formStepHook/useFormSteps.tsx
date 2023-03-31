import { useState } from "react";
import { UseFormTrigger } from "react-hook-form";

import {
  AddProgramFormFields,
  AddProgramForm,
} from "../program/useNewProgramForm";

export const useFormSteps = (isEdit?: boolean) => {
  const [currentStep, setCurrentStep] = useState(isEdit ? 3 : 1);

  const nextStep = async (trigger: UseFormTrigger<AddProgramForm>) => {
    let isValid: boolean = false;
    // eslint-disable-next-line default-case
    switch (currentStep) {
      case 1:
        isValid = await trigger([
          AddProgramFormFields.PROGRAM_LENGTH,
          AddProgramFormFields.FREQUENCY_PER_WEEK,
          AddProgramFormFields.PROGRAM_LEVEL,
        ]);
        break;
      case 2:
        isValid = await trigger([AddProgramFormFields.PROGRAM]);
        console.log(await trigger([AddProgramFormFields.PROGRAM]));
        break;
    }
    if (isValid) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };

  return { currentStep, nextStep };
};
