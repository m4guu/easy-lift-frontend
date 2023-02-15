import { FormExercise } from "../../hooks/formHooks/workout/useNewWorkoutForm";
import { WorkoutExercise } from "../../shared/interfaces";

export const generateWorkoutExercises = (
  formExercises: FormExercise[]
): WorkoutExercise[] => {
  const workoutExercises = formExercises.map((exercise) => {
    const { name, id, sets: formSets } = exercise;

    const sets = formSets.map((set) => {
      const { archived, tempo } = set;

      const [weight, reps] = archived.split("x").map((s) => Number(s.trim()));
      // calculate 1 rep max with epley formula
      const repMax = Math.round(weight * (1 + 0.0333 * reps));
      return {
        weight,
        reps,
        tempo,
        repMax,
      };
    });
    return {
      name,
      id,
      sets,
    };
  });

  return workoutExercises;
};
