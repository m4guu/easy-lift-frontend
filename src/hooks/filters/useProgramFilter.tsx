import { useState, useEffect, useCallback } from "react";
import ProgramLevels from "../../shared/enums/ProgramLevels";

import { Program } from "../../shared/interfaces";
import {
  minFreqTraining,
  maxFreqTraining,
  minProgramLength,
  maxProgramLength,
} from "../formHooks/program/constans";

export const useProgramFilter = (programs: Program[] | undefined) => {
  const [updatedPrograms, setUpdatedPrograms] = useState<Program[]>([]);

  const maxPrice =
    programs?.reduce((prev, current) =>
      prev.price > current.price ? prev : current
    ).price || 999;
  const minPrice =
    programs?.reduce((prev, current) =>
      prev.price < current.price ? prev : current
    ).price || 0;

  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<ProgramLevels>(
    ProgramLevels.NOVICE
  );
  const [selectedFrequency, setSelectedFrequency] = useState<number[]>([
    minFreqTraining,
    maxFreqTraining,
  ]);
  const [selectedLength, setSelectedLength] = useState<number[]>([
    minProgramLength,
    maxProgramLength,
  ]);
  const [selectedPrice, setSelectedPrice] = useState<number[]>([]);

  const handleSelectTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
  };

  const handleSelectLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as ProgramLevels;
    setSelectedLevel(value);
  };

  const handleSelectFrequency = (_event: Event, value: number[] | number) => {
    const rangeValue = value as number[];
    setSelectedFrequency(rangeValue);
  };

  const handleSelectLength = (_event: Event, value: number[] | number) => {
    const rangeValue = value as number[];
    setSelectedLength(rangeValue);
  };
  const handleSelectPrice = (_event: Event, value: number[] | number) => {
    const rangeValue = value as number[];
    setSelectedPrice(rangeValue);
  };

  const applyFilters = useCallback(() => {
    let filteredPrograms = programs || [];

    // title filter
    if (selectedTitle) {
      filteredPrograms = filteredPrograms.filter((program) =>
        program.title.toLowerCase().includes(selectedTitle.toLowerCase())
      );
    }

    // level filter
    if (selectedLevel) {
      filteredPrograms = filteredPrograms.filter(
        (program) => program.level === selectedLevel
      );
    }

    // frequency filter
    const minFrequency = selectedFrequency[0];
    const maxFrequency = selectedFrequency[1];
    filteredPrograms = filteredPrograms.filter(
      (program) =>
        program.frequencyPerWeek >= minFrequency &&
        program.frequencyPerWeek <= maxFrequency
    );

    // program length filter
    const minLength = selectedLength[0];
    const maxLength = selectedLength[1];
    filteredPrograms = filteredPrograms.filter(
      (program) =>
        program.programLength >= minLength && program.programLength <= maxLength
    );

    // price filter
    const minSelectedPrice = selectedPrice[0];
    const maxSelectedPrice = selectedPrice[1];
    filteredPrograms = filteredPrograms.filter(
      (program) =>
        program.price >= minSelectedPrice && program.price <= maxSelectedPrice
    );

    setUpdatedPrograms(filteredPrograms);
  }, [
    programs,
    selectedTitle,
    selectedLevel,
    selectedFrequency,
    selectedLength,
    selectedPrice,
  ]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    setSelectedPrice([minPrice, maxPrice]);
  }, [maxPrice, minPrice]);

  return {
    updatedPrograms,
    filterProgramProps: {
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
  };
};
