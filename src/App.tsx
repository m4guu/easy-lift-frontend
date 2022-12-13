import { Routes, Route } from "react-router-dom";

import { useAppSelector } from "./hooks/useContext";

import {
  Welcome,
  Auth,
  Configuration,
  Home,
  NewWorkout,
  ExerciseList,
  Exercise,
  NewProgram,
  WorkoutList,
  Workout,
  TrainerList,
  Trainer,
  ProgramList,
  Program,
  NotFound,
} from "./pages";

const App = () => {
  const user = useAppSelector((state) => state.user);
  let routes; // type?
  if (user) {
    if (!user.configured) {
      routes = (
        <>
          <Route path="/configuration" element={<Configuration />} />
          <Route path="*" element={<Configuration />} />
        </>
      );
    }
    if (user.role === "trainer" && user.configured) {
      routes = (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/newprogram" element={<NewProgram />} />
          <Route path="/trainers">
            <Route index element={<TrainerList />} />
            <Route path="/trainers/:id" element={<Trainer />} />
          </Route>
          <Route path="/programs">
            <Route index element={<ProgramList />} />
            <Route path="/programs/:id" element={<Program />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      );
    }
    if (user.role === "user" && user.configured) {
      routes = (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/newworkout">
            <Route index element={<NewWorkout />} />
            <Route path="/newworkout/exercises" element={<ExerciseList />} />
            <Route path="/newworkout/exercises/:id" element={<Exercise />} />
          </Route>
          <Route path="/workouts">
            <Route index element={<WorkoutList />} />
            <Route path="/workouts/:id" element={<Workout />} />
          </Route>
          <Route path="/trainers">
            <Route index element={<TrainerList />} />
            <Route path="/trainers/:id" element={<Trainer />} />
          </Route>
          <Route path="/programs">
            <Route index element={<ProgramList />} />
            <Route path="/programs/:id" element={<Program />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </>
      );
    }
  } else {
    routes = (
      <>
        <Route path="/" element={<Welcome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </>
    );
  }
  return <Routes>{routes}</Routes>;
};

export default App;
