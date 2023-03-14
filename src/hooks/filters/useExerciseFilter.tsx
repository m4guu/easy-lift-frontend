import { useState, useCallback, useEffect } from "react";
import { Exercise } from "../../shared/interfaces";

export const useExerciseFilter = (exercises: Exercise[] | undefined) => {
  const [updatedExercises, setUpdatedExercises] = useState<Exercise[]>([]);

  const [selectedExerciseName, setSelectedExerciseName] = useState("");

  const handleSelectExerciseName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedExerciseName(event.target.value);
  };

  const applyFilters = useCallback(() => {
    let filteredExercises = exercises || [];

    // name filter
    if (selectedExerciseName) {
      filteredExercises = filteredExercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(selectedExerciseName.toLowerCase())
      );
    }

    setUpdatedExercises(filteredExercises);
  }, [exercises, selectedExerciseName]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    updatedExercises,
    filterPanelProps: {
      selectedExerciseName,
      handleSelectExerciseName,
    },
  };
};
