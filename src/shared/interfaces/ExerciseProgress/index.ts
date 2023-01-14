interface ExerciseProgress {
  exerciseID: string;
  name: string;
  progress: { date: string; RM: number }[];
}
export default ExerciseProgress;
