import React, { useEffect } from "react";
import {
  FormProvider,
  FieldValues,
  UseFieldArrayUpdate,
} from "react-hook-form";
import { useSnackbar } from "notistack";

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
import { ExercisesModal } from "../../../../modals";
import { ErrorMessage } from "../../../../components";

type AddWorkoutProps = {
  workoutIndex?: number;
  updateWorkoutField?: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
};

export const AddWorkout: React.FC<AddWorkoutProps> = ({
  workoutIndex,
  updateWorkoutField,
}) => {
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
  } = useNewWorkoutForm({ workoutIndex, updateWorkoutField });

  const {
    open: openExerciseModal,
    isOpen: isExerciseModalOpen,
    close: closeExerciseModal,
  } = useExerciseModal();

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const { enqueueSnackbar } = useSnackbar();

  const component = user?.role === Role.user ? "form" : Box;

  useEffect(() => {
    if (isSubmitSuccessful && user?.role === Role.user) {
      enqueueSnackbar("Workout added successfuly.", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
  }, [enqueueSnackbar, isSubmitSuccessful, user]);

  return (
    <FormProvider {...methods}>
      <FormWrapper component={component}>
        <HeaderInputsWrapper>
          <WorkoutTitle />
          {user?.role === Role.user && <StartTime />}
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

      {errors.exercises?.message && (
        <ErrorMessage>{errors.exercises?.message}</ErrorMessage>
      )}

      <FormActionsWrapper>
        <ChooseExercise onClick={openExerciseModal} size="small">
          + exercise
        </ChooseExercise>

        <Reset onClick={resetForm} size="small" color="error">
          reset
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

      {isExerciseModalOpen && (
        <ExercisesModal
          appendExercise={appendExercise}
          isOpen={isExerciseModalOpen}
          closeModal={closeExerciseModal}
        />
      )}
    </FormProvider>
  );
};
