/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import { FormControl, Button, Box, Typography } from "@mui/material";
import { styled, alpha } from "@mui/system";
import TuneIcon from "@mui/icons-material/Tune";

import { ProgramLevels } from "../../../../shared/enums";
import {
  minFreqTraining,
  maxFreqTraining,
  maxProgramLength,
  minProgramLength,
} from "../../../../hooks/formHooks/program/constans";

import { LevelFilter } from "./views/LevelFilter/LevelFilter";
import { SearchBar, SliderBase, SectionHeader } from "../../../../components";

interface FilterPanelProps {
  filterHandlers: {
    selectedTitle: string;
    selectedLevel: ProgramLevels;
    selectedFrequency: number[];
    selectedLength: number[];
    selectedPrice: number[];
    minPrice: number;
    maxPrice: number;
    handleSelectTitle: (_event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectLevel: (_event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSelectFrequency: (_event: Event, value: number[] | number) => void;
    handleSelectLength: (_event: Event, value: number[] | number) => void;
    handleSelectPrice: (_event: Event, value: number[] | number) => void;
  };
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filterHandlers: {
    selectedTitle,
    selectedLevel,
    selectedFrequency,
    selectedLength,
    selectedPrice,
    minPrice,
    maxPrice,
    handleSelectTitle,
    handleSelectLevel,
    handleSelectFrequency,
    handleSelectLength,
    handleSelectPrice,
  },
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleShowFilter = () => {
    setShowFilters((prevState) => !prevState);
  };

  return (
    <Form>
      <Header>
        <SearchBar
          placeholder="Search program..."
          value={selectedTitle}
          onChange={handleSelectTitle}
        />

        <Button
          onClick={toggleShowFilter}
          startIcon={<TuneIcon />}
          size="small"
          color={showFilters ? "error" : "primary"}
        >
          {showFilters && "hide"} filters
        </Button>
      </Header>

      {showFilters && (
        <Box>
          <Typography variant="caption" color="text.secondary">
            Filters
          </Typography>

          <FilterSection>
            <Filters>
              {/* level filter */}
              <LevelFilter
                selectedLevel={selectedLevel}
                handleSelectLevel={handleSelectLevel}
              />

              {/* freq filter */}
              <SliderBase
                label="Frequency of Training"
                valueLabel="per week"
                selectedValue={selectedFrequency}
                handleSelectValue={handleSelectFrequency}
                minValue={minFreqTraining}
                maxValue={maxFreqTraining}
              />

              {/* program length filter */}
              <SliderBase
                label="Program Length"
                valueLabel="weeks"
                selectedValue={selectedLength}
                handleSelectValue={handleSelectLength}
                minValue={minProgramLength}
                maxValue={maxProgramLength}
              />

              {/* price filter */}
              <SliderBase
                label="Price"
                valueLabel="$"
                selectedValue={selectedPrice}
                handleSelectValue={handleSelectPrice}
                minValue={minPrice}
                maxValue={maxPrice}
              />
            </Filters>
          </FilterSection>
        </Box>
      )}
    </Form>
  );
};

const Form = styled(FormControl)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(1),
  margin: `${theme.spacing(2)} 0`,
}));

const Header = styled("header")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

const FilterSection = styled("section")(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(1),
}));

const Filters = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  gap: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    flexDirection: "column",
  },
}));
