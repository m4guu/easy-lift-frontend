import React from "react";

import { FormControl } from "@mui/material";
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
        placeholder="Search exercise..."
        value={selectedExerciseName}
        onChange={handleSelectExerciseName}
      />
    </Form>
  );
};

const Form = styled(FormControl)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));
