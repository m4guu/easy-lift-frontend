import { useState } from "react";

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
