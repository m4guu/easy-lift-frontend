import { useState } from "react";
import { UseFormTrigger } from "react-hook-form";

import { AddProgramFormFields } from "../program/useNewProgramForm";
import { AddProgramForm } from "../program/useNewProgramForm";

export const useFormSteps = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = async (trigger: UseFormTrigger<AddProgramForm>) => {
    let isValid: boolean = false;
    switch (currentStep) {
      case 1:
        isValid = await trigger([AddProgramFormFields.PROGRAM_TITLE]);
        break;
      case 2:
        isValid = await trigger([AddProgramFormFields.PROGRAM]);
        break;
    }
    if (isValid) {
      setCurrentStep((prevState) => prevState + 1);
    }
  };
  const prevStep = () => {
    setCurrentStep((prevState) => prevState - 1);
  };

  return { currentStep, nextStep, prevStep };
};
