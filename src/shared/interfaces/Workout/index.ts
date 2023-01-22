import Exercise from "../Exercise";

interface Workout {
  id: string;
  creator: string;
  title: string;
  date: string;
  exercises: Exercise[];
}

export default Workout;
