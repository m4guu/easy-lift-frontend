import { useState } from "react";

export enum WorkoutQueriesKeys {
  CREATOR = "creator",
  MONTH_NUMBER = "monthNumber",
  NAME = "name",
}

export interface WorkoutQueries {
  [WorkoutQueriesKeys.CREATOR]?: string;
  [WorkoutQueriesKeys.MONTH_NUMBER]?: number;
  [WorkoutQueriesKeys.NAME]?: string;
}

export const useWorkoutFilter = () => {
  const [selectedTitle, setSelectedTitle] = useState("");

  const handleSelectTitle = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSelectedTitle(event.target.value);
  };

  return {
    filterPanelProps: { selectedTitle, handleSelectTitle },
  };
};
