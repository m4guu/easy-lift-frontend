import React from "react";

import { FormControl } from "@mui/material";
import { styled } from "@mui/system";

import { SearchBar } from "../../../../components";

interface FilterPanelProps {
  filterHandlers: {
    selectedTitle: string;
    handleSelectTitle: React.ChangeEventHandler<HTMLInputElement>;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterHandlers: { selectedTitle, handleSelectTitle },
}) => {
  return (
    <Form>
      <SearchBar
        placeholder="Search workouts..."
        value={selectedTitle}
        onChange={handleSelectTitle}
      />
    </Form>
  );
};

const Form = styled(FormControl)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));
