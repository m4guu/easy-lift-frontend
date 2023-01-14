import React from "react";
import { Routes, Route } from "react-router-dom";
import { PATHS, NESTED_PATHS } from "./paths";

import { useGetUserRouteState } from "../store/redux-store/slices/user/user.hooks";

import { Role } from "../shared/enums";

import {
  Welcome,
  Auth,
  Configuration,
  Home,
  NewWorkout,
  ExerciseList,
  Exercise,
  NewProgram,
  Creator,
  WorkoutList,
  Workout,
  TrainerList,
  Trainer,
  ProgramList,
  Program,
  NotFound,
  BodyWeight,
} from "./index";
import Layout from "../Layout";

const Routing: React.FC = () => {
  const { id, isConfigured, role } = useGetUserRouteState();

  let routes;
  const isRouteWithLayout = !!id;

  if (id) {
    if (!isConfigured) {
      routes = (
        <>
          <Route path={PATHS.CONFIGURATION} element={<Configuration />} />
          <Route path={PATHS.notFound} element={<Configuration />} />
        </>
      );
    }
    if (role === Role.trainer && isConfigured) {
      routes = (
        <>
          <Route path={PATHS.default} element={<Home />} />
          <Route path={PATHS.NEW_PROGRAM}>
            <Route index element={<NewProgram />} />
            <Route
              path={NESTED_PATHS.NEW_PROGRAM_CREATOR}
              element={<Creator />}
            />
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
    }
    if (role === Role.user && isConfigured) {
      routes = (
        <>
          <Route path={PATHS.default} element={<Home />} />
          <Route path={PATHS.NEW_WORKOUT}>
            <Route index element={<NewWorkout />} />
            <Route
              path={NESTED_PATHS.EXERCISE_LIST}
              element={<ExerciseList />}
            />
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
    }
  } else {
    routes = (
      <>
        <Route path={PATHS.default} element={<Welcome />} />
        <Route path={PATHS.AUTH} element={<Auth />} />
        <Route path={PATHS.notFound} element={<NotFound />} />
      </>
    );
  }
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isRouteWithLayout ? (
        <Layout>
          <Routes>{routes}</Routes>
        </Layout>
      ) : (
        <Routes>{routes}</Routes>
      )}
    </>
  );
};

export default Routing;
