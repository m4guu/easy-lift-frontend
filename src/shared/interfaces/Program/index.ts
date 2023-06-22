import ProgramLevels from "../../enums/ProgramLevels";
import ProgramItem from "../ProgramItem";

interface Program {
  id: string;
  creator: string;
  title: string;
  level: ProgramLevels;
  frequencyPerWeek: number;
  programLength: number;
  program: ProgramItem[];
  image: File | string;
  price: number;
  description: string;
  _id?: string;
}
export default Program;
