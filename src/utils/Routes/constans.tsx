import { Route } from "react-router-dom";
import { PATHS, NESTED_PATHS } from "../../pages/paths";

import {
  Home,
  NewProgram,
  Creator,
  Trainers,
  Trainer,
  Programs,
  Program,
  NotFound,
  NewWorkout,
  Exercises,
  Exercise,
  ExerciseProgress,
  Workouts,
  Workout,
  BodyWeight,
} from "../../pages";

export const trainerRoutes = (
  <>
    <Route path={PATHS.default} element={<Home />} />
    <Route path={PATHS.NEW_PROGRAM}>
      <Route index element={<NewProgram />} />
      <Route path={NESTED_PATHS.NEW_PROGRAM_CREATOR} element={<Creator />} />
    </Route>

    <Route path={PATHS.NEW_WORKOUT} element={<NewWorkout />} />
    <Route path={PATHS.EXERCISES}>
      <Route index element={<Exercises />} />
      <Route path={NESTED_PATHS.EXERCISE} element={<Exercise />} />
    </Route>

    <Route path={PATHS.TRAINERS}>
      <Route index element={<Trainers />} />
      <Route path={NESTED_PATHS.TRAINER} element={<Trainer />} />
    </Route>
    <Route path={PATHS.PROGRAMS}>
      <Route index element={<Programs />} />
      <Route path={NESTED_PATHS.PROGRAM} element={<Program />} />
    </Route>
    <Route path={PATHS.notFound} element={<NotFound />} />
  </>
);

export const userRoutes = (
  <>
    <Route path={PATHS.default} element={<Home />} />
    <Route path={PATHS.NEW_WORKOUT} element={<NewWorkout />} />
    <Route path={PATHS.EXERCISES}>
      <Route index element={<Exercises />} />
      <Route path={NESTED_PATHS.EXERCISE} element={<Exercise />} />
      <Route
        path={NESTED_PATHS.EXERCISE_PROGRESS}
        element={<ExerciseProgress />}
      />
    </Route>
    <Route path={PATHS.WORKOUTS}>
      <Route index element={<Workouts />} />
      <Route path={NESTED_PATHS.WORKOUT} element={<Workout />} />
    </Route>
    <Route path={PATHS.TRAINERS}>
      <Route index element={<Trainers />} />
      <Route path={NESTED_PATHS.TRAINER} element={<Trainer />} />
    </Route>
    <Route path={PATHS.PROGRAMS}>
      <Route index element={<Programs />} />
      <Route path={NESTED_PATHS.PROGRAM} element={<Program />} />
    </Route>
    <Route path={PATHS.BODY_WEIGHT} element={<BodyWeight />} />
    <Route path={PATHS.notFound} element={<NotFound />} />
  </>
);
