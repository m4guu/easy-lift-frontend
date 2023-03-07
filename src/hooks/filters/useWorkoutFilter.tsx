import { useState, useEffect, useCallback } from "react";
import { Workout } from "../../shared/interfaces";

export const useWorkoutFilter = (workouts: Workout[] | undefined) => {
  const [updatedWorkouts, setUpdatedWorkouts] = useState<Workout[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleSelectTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
  };

  const applyFilters = useCallback(() => {
    let filteredWorkouts = workouts || [];

    // name filter
    if (selectedTitle) {
      filteredWorkouts = filteredWorkouts.filter((workout) =>
        workout.title.toLowerCase().includes(selectedTitle.toLowerCase())
      );
    }

    setUpdatedWorkouts(filteredWorkouts);
  }, [selectedTitle, workouts]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  return {
    updatedWorkouts,
    filterPanelProps: { selectedTitle, handleSelectTitle },
  };
};
