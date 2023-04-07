import React, { useEffect } from "react";
import {
  FormProvider,
  FieldValues,
  UseFieldArrayUpdate,
} from "react-hook-form";

import { Box } from "@mui/material";

import { useUserContext } from "../../../../contexts/userContext";
import { useNewWorkoutForm } from "../../../../hooks/formHooks/workout/useNewWorkoutForm";
import { useExerciseModal } from "../../../../hooks/modalHooks/Exercises/useExerciseModal";
import { useSnackbar } from "../../../../hooks";

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
} from "./views/WorkoutForm/Workout.form";
import { ExercisesModal } from "../../../../modals";
import { Workout } from "../../../../shared/interfaces";
import { Role, SnackbarStatus } from "../../../../shared/enums";
import { ErrorMessage } from "../../../../components";
import { NewWorkoutSettings } from "./views/NewWorkoutSettings/NewWorkoutActions";

type WorkoutFormProviderProps = {
  workoutIndex?: number;
  updateWorkoutField?: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
  editWorkout?: Workout[];
};

export const WorkoutFormProvider: React.FC<WorkoutFormProviderProps> = ({
  workoutIndex,
  updateWorkoutField,
  editWorkout,
}) => {
  const { user } = useUserContext();

  const {
    pending,
    methods,
    resetForm,
    onSubmit,
    onDraftSave,
    isDraftSubmited,
    canSubmit,
    exerciseFields,
    removeExercise,
    appendExercise,
  } = useNewWorkoutForm({ workoutIndex, updateWorkoutField, editWorkout });

  const {
    open: openExerciseModal,
    isOpen: isExerciseModalOpen,
    close: closeExerciseModal,
  } = useExerciseModal();

  const {
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  const snackbar = useSnackbar();

  const isUserLogin = user?.role === Role.user;
  const component = isUserLogin ? "form" : Box;

  useEffect(() => {
    if ((isSubmitSuccessful && isUserLogin) || isDraftSubmited) {
      snackbar("Workout added successfuly.", SnackbarStatus.SUCCESS);
    }
  }, [snackbar, isSubmitSuccessful, user, isDraftSubmited, isUserLogin]);

  return (
    <FormProvider {...methods}>
      <FormWrapper component={component}>
        <HeaderInputsWrapper>
          <WorkoutTitle />
          {isUserLogin && <StartTime />}
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
          onClick={handleSubmit(onSubmit)}
          size="small"
          loading={pending}
          disabled={!canSubmit}
          variant="contained"
          color={editWorkout ? "info" : "primary"}
        >
          {isUserLogin ? <Box>{editWorkout ? "update" : "finish"}</Box> : "add"}
          &nbsp;workout
        </Submit>
      </FormActionsWrapper>
      {isExerciseModalOpen && (
        <ExercisesModal
          appendExercise={appendExercise}
          isOpen={isExerciseModalOpen}
          closeModal={closeExerciseModal}
        />
      )}

      {isUserLogin && <NewWorkoutSettings saveDraft={onDraftSave} />}
    </FormProvider>
  );
};
