import React, { useState } from "react"
import { FormProvider } from "react-hook-form";

import { Typography } from "@mui/material";

import { useUserContext } from "../../../../contexts/userContext";
import { Role } from "../../
import { PATHS } from "../../../pathsths";
import { defaultExercises } from "./constans";
import {
  ChooseExercise,
  ExercisesWrapper,
  FormActionsWrapper,
  FormWrapper,
  Reset,
  Submit,
} from "./styles/addWorkout.styles";
import { Exercise, StartTime, WorkoutTitle } from "./views/AddWorkout.form";
import {useNewWorkoutForm} from "../../../../hooks/formHooks/workout/useNewWorkoutForm";

export const AddWorkout: React.FC = () => {
  const [exercises, setExercises] = useState(defaultExercises);
  const { user } = useUserContext();
  const {pending, methods, onSubmit, canSubmit} = useNewWorkoutForm();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <WorkoutTitle />
        <StartTime />
        {exercises.length !== 0 && (
          <ExercisesWrapper>
            {exercises.map((exercise) => {
              return <Exercise key={exercise.id} exercise={exercise} />;
            })}
          </ExercisesWrapper>
        )}
      </FormWrapper>

      <FormActionsWrapper>
        <ChooseExercise to={PATHS.EXERCISES}>
          <Typography color="primary">+ exercise</Typography>
        </ChooseExercise>

        <Reset color="error">reset workout</Reset>

        <Submit
          onClick={handleSubmit((data) => onSubmit(data))}
          loading={pending}
          disabled={!canSubmit}
          variant="contained"
        >
          {user?.role === Role.user ? "finish" : "add"} workout
        </Submit>
      </FormActionsWrapper>
    </FormProvider>
  );
};
