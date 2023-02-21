import { Route } from "react-router-dom";
import { PATHS, NESTED_PATHS } from "../../pages/paths";

import {
  Home,
  NewProgram,
  Trainers,
  Trainer,
  Programs,
  Program,
  NotFound,
  NewWorkout,
  Workouts,
  Workout,
  BodyWeight,
} from "../../pages";

export const trainerRoutes = (
  <>
    <Route path={PATHS.default} element={<Home />} />
    <Route path={PATHS.NEW_PROGRAM}>
      <Route index element={<NewProgram />} />
    </Route>

    <Route path={PATHS.NEW_WORKOUT} element={<NewWorkout />} />

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
