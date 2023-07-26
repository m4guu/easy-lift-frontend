import {
  maxFreqTraining,
  maxProgramLength,
  minFreqTraining,
  minProgramLength,
} from "../../../../../../hooks/formHooks/program/constans";

type LengthIteration = {
  programLength: number;
  expectedTrainingWeekesLength: number;
};
type FrequencyIteration = {
  trainingFrequency: number;
  expectedTrainingLength: number;
};

export const choosenLengthTestCases: [LengthIteration][] = [
  [
    {
      programLength: minProgramLength,
      expectedTrainingWeekesLength: minProgramLength,
    },
  ],
  [
    {
      programLength: maxProgramLength,
      expectedTrainingWeekesLength: maxProgramLength,
    },
  ],
];

export const choosenFrequencyTestCases: [FrequencyIteration][] = [
  [
    {
      trainingFrequency: minFreqTraining,
      // min program length is default program value
      expectedTrainingLength: minFreqTraining * minProgramLength,
    },
  ],
  [
    {
      trainingFrequency: maxFreqTraining,
      expectedTrainingLength: maxFreqTraining * minProgramLength,
    },
  ],
];
