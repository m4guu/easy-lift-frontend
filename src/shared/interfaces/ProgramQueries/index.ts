import { ProgramLevels } from "../../enums";

interface ProgramQueries {
  limit?: number;
  creator?: string;
  name?: string;
  maxPrice?: number;
  minPrice?: number;
  minFreqTraining?: number;
  maxFreqTraining?: number;
  minProgramLength?: number;
  maxProgramLength?: number;
  programLevel?: ProgramLevels;
}

export default ProgramQueries;
