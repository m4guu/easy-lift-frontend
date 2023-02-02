import WorkoutExercise from "../WorkoutExercise";

interface Workout {
  id: string;
  creator: string;
  title: string;
  date: string;
  exercises: WorkoutExercise[];
}

export default Workout;
