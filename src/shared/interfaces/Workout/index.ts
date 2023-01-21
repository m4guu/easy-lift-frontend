import { Exercise } from "../Exercise";

interface Workout {
  id: string;
  title: string;
  date: string;
  exercises: Exercise[];
}

export default Workout;
