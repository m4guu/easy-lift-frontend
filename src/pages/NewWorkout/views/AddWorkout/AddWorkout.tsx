import React, { useState } from "react";
import { FormProvider } from "react-hook-form";

import { Typography } from "@mui/material";

import { useUserContext } from "../../../../contexts/userContext";
import { useNewWorkoutForm } from "../../../../hooks/formHooks/workout/useNewWorkoutForm";
import { Role } from "../../../../shared/enums";
import { PATHS } from "../../../paths";
import { defaultExercises } from "./constans";
import {
  ChooseExercise,
  ExercisesWrapper,
  FormActionsWrapper,
  FormWrapper,
  HeaderInputsWrapper,
  Reset,
  Submit,
} from "./styles/addWorkout.styles";
import {
  Exercise,
  StartTime,
  WorkoutTitle,
} from "./views/AddWorkoutForm/AddWorkout.form";

export const AddWorkout: React.FC = () => {
  const [exercises, setExercises] = useState(defaultExercises);
  const { user } = useUserContext();
  const { pending, methods, onSubmit, canSubmit } = useNewWorkoutForm();

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <HeaderInputsWrapper>
          <WorkoutTitle />
          <StartTime />
        </HeaderInputsWrapper>

        {exercises.length !== 0 && (
          <ExercisesWrapper>
            {exercises.map((exercise, index) => {
              return (
                <Exercise
                  key={exercise.id}
                  exercise={exercise}
                  exerciseIndex={index}
                />
              );
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
