import React from "react";

import { FormControl, Button } from "@mui/material";
import { styled } from "@mui/system";

import { SearchBar } from "../../../../components";

interface FilterPanelProps {
  refetchWorkouts: any;
  filterHandlers: {
    selectedTitle: string;
    handleSelectTitle: React.ChangeEventHandler<HTMLInputElement>;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  refetchWorkouts,
  filterHandlers: { selectedTitle, handleSelectTitle },
}) => {
  return (
    <Form>
      <SearchBar
        placeholder="Search workouts..."
        value={selectedTitle}
        onChange={handleSelectTitle}
      />
      <Button variant="outlined" onClick={refetchWorkouts}>
        search
      </Button>
    </Form>
  );
};

const Form = styled(FormControl)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  margin: `${theme.spacing(2)} 0`,
}));
