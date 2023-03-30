import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

import {
  AddWorkoutForm,
  AddWorkoutFormFields,
} from "../../hooks/formHooks/workout/useNewWorkoutForm";

import { Role } from "../../shared/enums";
import {
  WorkoutExercise,
  FormExercise,
  User,
  Workout,
} from "../../shared/interfaces";

export const generateWorkoutExercises = (
  formExercises: FormExercise[],
  userRole?: Role
): WorkoutExercise[] => {
  const workoutExercises = formExercises.map((exercise) => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, _id, sets: formSets } = exercise;

    const sets = formSets.map((set) => {
      const { archived, tempo, goal } = set;

      const splitValue = userRole === Role.trainer ? goal : archived;

      const [weight, reps] = splitValue.split("x").map((s) => Number(s.trim()));
      // calculate 1 rep max with epley formula
      const repMax = Math.round(weight * (1 + 0.0333 * reps));
      return {
        goal,
        tempo,
        archived,
        repMax,
      };
    });
    return {
      name,
      id: _id,
      sets,
    };
  });

  return workoutExercises;
};
export const generateEditExercises = (
  workoutExercises: WorkoutExercise[]
): FormExercise[] => {
  const editExercises = workoutExercises.map((workoutExercise) => {
    const editSets = workoutExercise.sets.map((set) => {
      return {
        goal: set.goal,
        tempo: set.tempo,
        archived: set.archived,
      };
    });
    return {
      name: workoutExercise.name,
      id: uuidv4(),
      _id: workoutExercise.id,
      sets: editSets,
    };
  });
  return editExercises;
};

export const generateNewWorkout = (
  data: AddWorkoutForm,
  user: User,
  isDraft: boolean,
  id?: string
): Workout => {
  return {
    id: id || uuidv4(),
    creator: user.id,
    title: data.workoutTitle,
    date: format(data.startTime, "yyyy-MM-dd"),
    exercises: isDraft
      ? data.exercises
      : generateWorkoutExercises(data.exercises, user.role),
    isDraft,
  };
};

export const generateWorkoutToEdit = (workout: Workout): AddWorkoutForm => {
  return {
    [AddWorkoutFormFields.WORKOUT_TITLE]: workout.title,
    [AddWorkoutFormFields.START_TIME]: new Date(workout.date),
    [AddWorkoutFormFields.EXERCISES]: generateEditExercises(workout.exercises),
  };
};
