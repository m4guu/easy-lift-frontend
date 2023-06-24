import React from "react";

import { Typography, Switch } from "@mui/material";

import { Form, ControlLabel } from "./styles/FilterPanel.styles";

import { SearchBar } from "../../../../components";

interface FilterPanelProps {
  filterHandlers: {
    selectedName: string;
    selectedPersonalTraining: boolean;
    handleSelectName: React.ChangeEventHandler<HTMLInputElement>;
    handleSelectPersonalTrening: (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean
    ) => void;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterHandlers: {
    selectedName,
    selectedPersonalTraining,
    handleSelectName,
    handleSelectPersonalTrening,
  },
}) => {
  return (
    <Form>
      <SearchBar value={selectedName} onChange={handleSelectName} />

      {/* personal training filter */}
      <ControlLabel
        labelPlacement="top"
        label={
          <Typography variant="caption" color="text.secondary">
            Personal Trainings
          </Typography>
        }
        control={
          <Switch
            size="small"
            value={selectedPersonalTraining}
            onChange={handleSelectPersonalTrening}
          />
        }
      />
    </Form>
  );
};
