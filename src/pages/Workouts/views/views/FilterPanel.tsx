import React from "react";

import { FormControl } from "@mui/material";

import { SearchBar } from "../../../../components";

interface FilterPanelProps {
  filterHandlers: {
    selectedTitle: string;
    handleSelectTitle: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterHandlers: { selectedTitle, handleSelectTitle },
}) => {
  return (
    <FormControl>
      <SearchBar value={selectedTitle} onChange={handleSelectTitle} />
    </FormControl>
  );
};
