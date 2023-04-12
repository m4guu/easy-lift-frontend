import React from "react";

import { Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import {
  Form,
  PersonalTrainingSwitch,
  ControlLabel,
} from "./styles/FilterPanel.styles";

import { SearchBar } from "../../../../components";

interface FilterPanelProps {
  filterHandlers: {
    selectedName: string;
    selectedPersonalTraining: boolean;
    selectedGyms: string[];
    handleSelectName: React.ChangeEventHandler<HTMLInputElement>;
    handleSelectPersonalTrening: (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean
    ) => void;
    handleSelectGyms: (
      event: React.ChangeEvent<HTMLInputElement>,
      gyms: string[]
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
  const theme = useTheme();
  return (
    <Form>
      <SearchBar
        placeholder="Search trener..."
        value={selectedName}
        onChange={handleSelectName}
      />

      {/* personal training filter */}
      <ControlLabel
        labelPlacement="top"
        label={
          <Typography variant="caption" color={theme.palette.text.secondary}>
            Personal Trainings
          </Typography>
        }
        control={
          <PersonalTrainingSwitch
            size="small"
            value={selectedPersonalTraining}
            onChange={handleSelectPersonalTrening}
          />
        }
      />
    </Form>
  );
};
