import Workout from "../Workout";

interface UpdateWorkout {
  workoutId: string;
  updatedWorkout: Omit<Workout, "id">;
}

export default UpdateWorkout;
