/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";

import { FormControl, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
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
  refetchPrograms: any;
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
  refetchPrograms,
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
        <FilterSection>
          <SectionHeader>filters</SectionHeader>
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
      )}

      <Button variant="outlined" onClick={refetchPrograms}>
        search
      </Button>
    </Form>
  );
};

const Form = styled(FormControl)(({ theme }) => ({
  width: "100%",
  margin: `${theme.spacing(2)} 0`,
}));

const Header = styled("header")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
  alignItems: "flex-end",
});

const FilterSection = styled("section")(({ theme }) => ({
  backgroundColor: theme.palette.background.layout,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const Filters = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  backgroundColor: theme.palette.background.layout,
  borderRadius: theme.spacing(1),
  padding: theme.spacing(2),
  gap: theme.spacing(5),
  [theme.breakpoints.down("md")]: {
    alignItems: "center",
    flexDirection: "column",
  },
}));
