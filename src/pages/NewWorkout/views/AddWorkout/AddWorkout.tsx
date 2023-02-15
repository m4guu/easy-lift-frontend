import React from "react";
import { FormProvider } from "react-hook-form";

import { Box } from "@mui/material";

import { useUserContext } from "../../../../contexts/userContext";
import { useNewWorkoutForm } from "../../../../hooks/formHooks/workout/useNewWorkoutForm";

import { Role } from "../../../../shared/enums";
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
import { useExerciseModal } from "../../../../hooks/modalHooks/Exercises/useExerciseModal";

export const AddWorkout: React.FC = () => {
  const { user } = useUserContext();
  const {
    pending,
    methods,
    resetForm,
    onSubmit,
    canSubmit,
    exerciseFields,
    removeExercise,
    appendExercise,
  } = useNewWorkoutForm();

  const { open: openExerciseModal, Modal: ExerciseModal } =
    useExerciseModal(appendExercise);

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <FormWrapper>
        <HeaderInputsWrapper>
          <WorkoutTitle />
          <StartTime />
        </HeaderInputsWrapper>

        {exerciseFields.length !== 0 && (
          <ExercisesWrapper>
            {exerciseFields.map((exercise, index) => {
              return (
                <Exercise
                  key={exercise.id}
                  exercise={exercise}
                  removeExercise={removeExercise}
                  exerciseIndex={index}
                />
              );
            })}
          </ExercisesWrapper>
        )}
      </FormWrapper>
      {/* // todo: add error handling component */}
      <Box>{errors.exercises?.message}</Box>
      <FormActionsWrapper>
        <ChooseExercise onClick={openExerciseModal} size="small">
          add exercise
        </ChooseExercise>

        <Reset onClick={resetForm} size="small" color="error">
          reset workout
        </Reset>

        <Submit
          onClick={handleSubmit((data) => onSubmit(data))}
          size="small"
          loading={pending}
          disabled={!canSubmit}
          variant="contained"
        >
          {user?.role === Role.user ? "finish" : "add"} workout
        </Submit>
      </FormActionsWrapper>

      <ExerciseModal />
    </FormProvider>
  );
};
