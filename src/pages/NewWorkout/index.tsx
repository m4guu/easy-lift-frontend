import React from "react";
import { Link } from "react-router-dom";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { useAddWorkoutMutation } from "../../hooks/queryHooks/workoutsHooks/useAddWorkoutMutation";
import { useAddUserProgresMutation } from "../../hooks/queryHooks/userProgressHooks/useAddUserProgresMutation";

import { DUMMY_WORKOUT } from "./constans";

import { generateUserProgress } from "../../utils/UserProgress";
import { Status } from "../../shared/enums";

import { AddWorkout } from "./views/AddWorkout/AddWorkout";
import { SectionHeader, SectionContainer } from "../../components";

const NewWorkoutPage: React.FC = () => {
  const { status: addWorkotStatus, mutateAsync: addQueryWorkout } =
    useAddWorkoutMutation();
  const { status: addUserProgresStatus, mutate: addQueryUserProgres } =
    useAddUserProgresMutation();

  // ! refactory when the backend will be written addQueryWorkout won't be async
  // ! addNewWorkout is different and depend on user ROLE
  // todo: migrate funcionality to useNewWorkoutForm => onSubmit
  const addNewWorkout = () => {
    addQueryWorkout(DUMMY_WORKOUT).then(() => {
      // new user's progress depends on workout
      const newUserProgress = generateUserProgress(DUMMY_WORKOUT);

      return newUserProgress.map((userProgres) =>
        addQueryUserProgres(userProgres)
      );
    });
  };

  const isLoading =
    addWorkotStatus === Status.LOADING ||
    addUserProgresStatus === Status.LOADING;

  return (
    <SectionContainer>
      <SectionHeader>New Workout</SectionHeader>

      <AddWorkout />

      {/* <SectionFooter>
        <ExercisesLink to={PATHS.EXERCISES}>
          <Typography color="primary">+ exercise</Typography>
        </ExercisesLink>

        <LoadingButton
          loading={isLoading}
          onClick={addNewWorkout}
          variant="contained"
        >
          {user?.role === Role.user ? "finish" : "add"} workout
        </LoadingButton>
      </SectionFooter> */}
    </SectionContainer>
  );
};

const SectionFooter = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
});

const ExercisesLink = styled(Link)({
  textDecoration: "none",
});

const NewWorkout = NewWorkoutPage;
export default NewWorkout;
