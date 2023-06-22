import React from "react";

import { Typography, Button } from "@mui/material";
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
    handleSelectName: React.ChangeEventHandler<HTMLInputElement>;
    handleSelectPersonalTrening: (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean
    ) => void;
  };
  refetchTrainers: any;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterHandlers: {
    selectedName,
    selectedPersonalTraining,
    handleSelectName,
    handleSelectPersonalTrening,
  },
  refetchTrainers,
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
      <Button variant="outlined" size="small" onClick={refetchTrainers}>
        search
      </Button>
    </Form>
  );
};
