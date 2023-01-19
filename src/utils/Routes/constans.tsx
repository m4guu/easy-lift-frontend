import { Route } from "react-router-dom";
import { PATHS, NESTED_PATHS } from "../../pages/paths";

import {
  Home,
  NewProgram,
  Creator,
  TrainerList,
  Trainer,
  ProgramList,
  Program,
  NotFound,
  NewWorkout,
  ExerciseList,
  Exercise,
  WorkoutList,
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
    <Route path={PATHS.TRAINERS}>
      <Route index element={<TrainerList />} />
      <Route path={NESTED_PATHS.TRAINER} element={<Trainer />} />
    </Route>
    <Route path={PATHS.PROGRAMS}>
      <Route index element={<ProgramList />} />
      <Route path={NESTED_PATHS.PROGRAM} element={<Program />} />
    </Route>
    <Route path={PATHS.notFound} element={<NotFound />} />
  </>
);

export const userRoutes = (
  <>
    <Route path={PATHS.default} element={<Home />} />
    <Route path={PATHS.NEW_WORKOUT}>
      <Route index element={<NewWorkout />} />
      <Route path={NESTED_PATHS.EXERCISE_LIST} element={<ExerciseList />} />
      <Route path={NESTED_PATHS.EXERCISE} element={<Exercise />} />
    </Route>
    <Route path={PATHS.WORKOUTS}>
      <Route index element={<WorkoutList />} />
      <Route path={NESTED_PATHS.WORKOUT} element={<Workout />} />
    </Route>
    <Route path={PATHS.TRAINERS}>
      <Route index element={<TrainerList />} />
      <Route path={NESTED_PATHS.TRAINER} element={<Trainer />} />
    </Route>
    <Route path={PATHS.PROGRAMS}>
      <Route index element={<ProgramList />} />
      <Route path={NESTED_PATHS.PROGRAM} element={<Program />} />
    </Route>
    <Route path={PATHS.BODY_WEIGHT} element={<BodyWeight />} />
    <Route path={PATHS.notFound} element={<NotFound />} />
  </>
);
