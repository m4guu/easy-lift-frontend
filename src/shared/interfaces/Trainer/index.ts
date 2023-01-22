import Program from "../Program";

interface Trainer {
  id: string;
  image: string;
  name: string;
  age: number;
  programs: Program[];
}

export default Trainer;
