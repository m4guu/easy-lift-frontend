import { useState, useEffect } from "react";
import ProgramLevels from "../../shared/enums/ProgramLevels";

import {
  minFreqTraining,
  maxFreqTraining,
  minProgramLength,
  maxProgramLength,
} from "../formHooks/program/constans";

export const useProgramFilter = () => {
  const maxPrice = 999;
  const minPrice = 0;

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

  useEffect(() => {
    setSelectedPrice([minPrice, maxPrice]);
  }, [maxPrice, minPrice]);

  return {
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
