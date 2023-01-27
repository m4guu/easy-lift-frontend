import React, { useState } from "react";

import { LoadingButton } from "@mui/lab";

import { useAddWorkoutMutation } from "../../hooks/queryHooks/workoutsHooks/useAddWorkoutMutation";
import { useAddUserProgresMutation } from "../../hooks/queryHooks/userProgressHooks/useAddUserProgresMutation";

import { DUMMY_WORKOUT } from "./constans";
import { SectionHeader, SectionContainer } from "../../components";
import { generateUserProgress } from "../../utils/UserProgress";
import { Status } from "../../shared/enums";

const NewWorkoutPage: React.FC = () => {
  const [asyncError, setAsyncError] = useState(false);

  const { status: addWorkotStatus, mutateAsync: addQueryWorkout } =
    useAddWorkoutMutation();
  const { status: addUserProgresStatus, mutate: addQueryUserProgres } =
    useAddUserProgresMutation();

  const addNewWorkout = () => {
    addQueryWorkout(DUMMY_WORKOUT)
      .then(() => {
        // new user's progress depends on workout
        const newUserProgress = generateUserProgress(DUMMY_WORKOUT);

        return newUserProgress.map((userProgres) =>
          addQueryUserProgres(userProgres)
        );
      })
      .catch(() => setAsyncError(true));
  };

  const isLoading =
    addWorkotStatus === Status.LOADING ||
    addUserProgresStatus === Status.LOADING;

  const isError =
    asyncError ||
    addWorkotStatus === Status.ERROR ||
    addUserProgresStatus === Status.ERROR;

  const isSucces =
    addWorkotStatus === Status.SUCCESS &&
    addUserProgresStatus === Status.SUCCESS;

  return (
    <SectionContainer>
      <SectionHeader>New Program</SectionHeader>
      <LoadingButton
        loading={isLoading}
        onClick={addNewWorkout}
        variant="contained"
      >
        add new workout
      </LoadingButton>
      {isSucces && <div>ADDED SUCCESFULLY</div>}
      {isError && <div>SERVER ERROR! TRY AGAIN LATER</div>}
    </SectionContainer>
  );
};

const NewWorkout = NewWorkoutPage;
export default NewWorkout;
