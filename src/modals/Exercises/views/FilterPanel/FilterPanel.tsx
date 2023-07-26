import React from "react";

import { styled } from "@mui/system";

import { SearchBar } from "../../../../components";

interface FilterPanelProps {
  filterHandlers: {
    selectedExerciseName: string;
    handleSelectExerciseName: (
      event: React.ChangeEvent<HTMLInputElement>
    ) => void;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterHandlers: { selectedExerciseName, handleSelectExerciseName },
}) => {
  return (
    <Form>
      <SearchBar
        value={selectedExerciseName}
        onChange={handleSelectExerciseName}
      />
    </Form>
  );
};

const Form = styled("form")(({ theme }) => ({
  maxWidth: "30rem",
  paddingBottom: theme.spacing(2),
}));
