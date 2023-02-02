import Set from "../Set";

interface UserProgres {
  id: string;
  workoutId: string;
  userId: string;
  exerciseId: string;
  exerciseName: string;
  date: string;
  sets: Set[];
  repMax: number;
}
export default UserProgres;
