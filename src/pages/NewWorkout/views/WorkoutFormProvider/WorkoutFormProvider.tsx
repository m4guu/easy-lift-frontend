import React, { useEffect } from "react";
import {
  FormProvider,
  FieldValues,
  UseFieldArrayUpdate,
} from "react-hook-form";
import { useSnackbar } from "notistack";

import { Box, Typography } from "@mui/material";

import { useUserContext } from "../../../../contexts/userContext";
import { useNewWorkoutForm } from "../../../../hooks/formHooks/workout/useNewWorkoutForm";
import { useExerciseModal } from "../../../../hooks/modalHooks/Exercises/useExerciseModal";

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
import { Role } from "../../../../shared/enums";
import { ErrorMessage } from "../../../../components";
import { NewWorkoutSettings } from "./views/NewWorkoutSettings/NewWorkoutActions";

type AddWorkoutProps = {
  workoutIndex?: number;
  updateWorkoutField?: UseFieldArrayUpdate<
    FieldValues,
    `program.${number}.weekWorkouts`
  >;
  editWorkout?: Workout[];
};

export const WorkoutFormProvider: React.FC<AddWorkoutProps> = ({
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

  const { enqueueSnackbar } = useSnackbar();

  const component = user?.role === Role.user ? "form" : Box;

  useEffect(() => {
    if ((isSubmitSuccessful && user?.role === Role.user) || isDraftSubmited) {
      enqueueSnackbar("Workout added successfuly.", {
        variant: "success",
        autoHideDuration: 3000,
      });
    }
  }, [enqueueSnackbar, isSubmitSuccessful, user, isDraftSubmited]);

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
          onClick={handleSubmit(onSubmit)}
          size="small"
          loading={pending}
          disabled={!canSubmit}
          variant="contained"
          color={editWorkout ? "info" : "primary"}
        >
          {user?.role === Role.user ? (
            <Box>{editWorkout ? "update" : "finish"}</Box>
          ) : (
            "add"
          )}
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

      {user?.role === Role.user && (
        <NewWorkoutSettings saveDraft={onDraftSave} />
      )}
    </FormProvider>
  );
};