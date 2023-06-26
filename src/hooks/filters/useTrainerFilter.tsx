import React, { useState } from "react";

export enum TrainerQueriesKeys {
  NAME = "name",
  PERSONAL_TRAINING = "personalTraining",
}
export interface TraninerQueries {
  [TrainerQueriesKeys.NAME]?: string;
  [TrainerQueriesKeys.PERSONAL_TRAINING]?: boolean;
}

export const useTrainerFilter = () => {
  const [selectedName, setSelectedName] = useState("");
  const [selectedPersonalTraining, setPersonalTraining] = useState(false);

  const handleSelectName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedName(event.target.value);
  };
  const handleSelectPersonalTrening = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    setPersonalTraining(checked);
  };

  return {
    filterPanelProps: {
      selectedName,
      selectedPersonalTraining,
      handleSelectName,
      handleSelectPersonalTrening,
    },
  };
};
