import ProgramLevels from "../../enums/ProgramLevels";
import ProgramItem from "../ProgramItem";

interface Program {
  id: string;
  creator: { id: string; name: string };
  title: string;
  level: ProgramLevels;
  frequencyPerWeek: number;
  programLength: number;
  program: ProgramItem[];
  image: File | null; // DUMMY DATA
  price: number;
  description: string;
}
export default Program;
