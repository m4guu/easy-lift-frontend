import React from "react";

import { FormControlLabel, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

import {
  Form,
  PersonalTrainingSwitch,
  Gyms,
  ControlLabel,
} from "./styles/FilterPanel.styles";

import { gyms } from "../../../Configuration/views/ConfigurationForm/views/Trainer/form/constans";
import { SearchBar } from "../../../../components";

interface FilterPanelProps {
  filterHandlers: {
    selectedName: string;
    selectedPersonalTraining: boolean;
    selectedGyms: string[];
    // todo: change any
    handleSelectName: React.ChangeEventHandler<HTMLInputElement>;
    handleSelectPersonalTrening: (
      event: React.ChangeEvent<HTMLInputElement>,
      checked: boolean
    ) => void;
    handleSelectGyms: (...event: any[]) => void;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterHandlers: {
    selectedName,
    selectedPersonalTraining,
    selectedGyms,
    handleSelectName,
    handleSelectPersonalTrening,
    handleSelectGyms,
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
      {/* // todo: add gyms autocomplete when leaflet-map branch will be merged */}
    </Form>
  );
};
