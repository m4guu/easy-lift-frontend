import { useState, useEffect } from "react";
import ProgramLevels from "../../shared/enums/ProgramLevels";

import {
  minFreqTraining,
  maxFreqTraining,
  minProgramLength,
  maxProgramLength,
} from "../formHooks/program/constans";

export enum ProgramQueriesKeys {
  LIMIT = "limit",
  CREATOR = "creator",
  NAME = "name",
  MAX_PRICE = "maxPrice",
  MIN_PRICE = "minPrice",
  MIN_FREQ_TRAINING = "minFreqTraining",
  MAX_FREQ_TRAINING = "maxFreqTraining",
  MIN_PROGRAM_LENGTH = "minProgramLength",
  MAX_PROGRAM_LENGTH = "maxProgramLength",
  PROGRAM_LEVEL = "programLevel",
}

export interface ProgramQueries {
  [ProgramQueriesKeys.LIMIT]?: number;
  [ProgramQueriesKeys.CREATOR]?: string;
  [ProgramQueriesKeys.NAME]?: string;
  [ProgramQueriesKeys.MIN_PRICE]?: number;
  [ProgramQueriesKeys.MAX_PRICE]?: number;
  [ProgramQueriesKeys.MIN_FREQ_TRAINING]?: number;
  [ProgramQueriesKeys.MAX_FREQ_TRAINING]?: number;
  [ProgramQueriesKeys.MIN_PROGRAM_LENGTH]?: number;
  [ProgramQueriesKeys.MAX_PROGRAM_LENGTH]?: number;
  [ProgramQueriesKeys.PROGRAM_LEVEL]?: ProgramLevels;
}

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

  const programQueries: ProgramQueries = {
    name: selectedTitle,
    programLevel: selectedLevel,
    minPrice: selectedPrice[0],
    maxPrice: selectedPrice[1],
    minFreqTraining: selectedFrequency[0],
    maxFreqTraining: selectedFrequency[1],
    minProgramLength: selectedLength[0],
    maxProgramLength: selectedLength[1],
  };

  const handleSelectTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTitle(event.target.value);
  };
  const handleSelectLevel = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLevel(event.target.value as ProgramLevels);
  };
  const handleSelectFrequency = (_event: Event, value: number[] | number) => {
    setSelectedFrequency(value as number[]);
  };
  const handleSelectLength = (_event: Event, value: number[] | number) => {
    setSelectedLength(value as number[]);
  };
  const handleSelectPrice = (_event: Event, value: number[] | number) => {
    setSelectedPrice(value as number[]);
  };

  useEffect(() => {
    setSelectedPrice([minPrice, maxPrice]);
  }, [maxPrice, minPrice]);

  return {
    programQueries,
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
