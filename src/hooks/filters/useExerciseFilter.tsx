import { useState } from "react";

export const useExerciseFilter = () => {
  const [selectedExerciseName, setSelectedExerciseName] = useState("");

  const handleSelectExerciseName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedExerciseName(event.target.value);
  };

  return {
    filterPanelProps: {
      selectedExerciseName,
      handleSelectExerciseName,
    },
  };
};
