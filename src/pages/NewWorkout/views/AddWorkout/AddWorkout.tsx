import React, { useState } from "react";
import { FormProvider } from "react-hook-form";

import { Typography, Box } from "@mui/material";

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
  ExercisesModal,
} from "./styles/addWorkout.styles";
import {
  Exercise,
  StartTime,
  WorkoutTitle,
} from "./views/AddWorkoutForm/AddWorkout.form";
import Exercises from "../../../Exercises";

export const AddWorkout: React.FC = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
        <ChooseExercise onClick={handleOpen}>
          <Typography color="primary">+ exercise</Typography>
        </ChooseExercise>

        <Reset onClick={resetForm} color="error">
          reset workout
        </Reset>

        <Submit
          onClick={handleSubmit((data) => onSubmit(data))}
          loading={pending}
          disabled={!canSubmit}
          variant="contained"
        >
          {user?.role === Role.user ? "finish" : "add"} workout
        </Submit>
      </FormActionsWrapper>

      <ExercisesModal
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { backgroundColor: "inherit" } }}
      >
        <Box>
          <Exercises appendExercise={appendExercise} closeModal={handleClose} />
        </Box>
      </ExercisesModal>
    </FormProvider>
  );
};
