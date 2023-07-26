import { UseFieldArrayReturn, useFormContext } from "react-hook-form";

import { Divider, styled, TextField, useTheme } from "@mui/material";

import {
  ControlledDatePicker,
  ControlledTextField,
} from "../../../../../../features";
import { AddWorkoutFormFields } from "../../../../../../hooks/formHooks/workout/useNewWorkoutForm";

import { FieldWrapper, SetsContainer } from "./styles/addWorkoutForm.styles";
import { SetLabels } from "./views/SetLabels/SetLabels";
import { Sets } from "./views/Sets/Sets";

// Workout title //
export const WorkoutTitle = styled(() => (
  <ControlledTextField
    variant="standard"
    size="small"
    label="Workout Title"
    fieldName={AddWorkoutFormFields.WORKOUT_TITLE}
    placeholder="Add workout title..."
  />
))``;
//

// Start time //
export const StartTime = styled(() => (
  <ControlledDatePicker
    fieldName={AddWorkoutFormFields.START_TIME}
    label="Start Time"
  />
))``;
//

// Exercise //
type ExerciseProps = {
  exercise: {
    id: string;
    _id: string;
    name: string;
  };
  exerciseIndex: number;
  removeExercise: UseFieldArrayReturn["remove"];
};

export const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  exerciseIndex,
  removeExercise,
}) => {
  const theme = useTheme();
  const { register } = useFormContext();

  return (
    <FieldWrapper>
      <TextField
        size="small"
        {...register(
          `${AddWorkoutFormFields.EXERCISES}.[${exerciseIndex}].name`
        )}
        style={{ width: "100%" }}
        InputProps={{
          readOnly: true,
          disableUnderline: true,
          style: { color: theme.palette.primary.main, width: "100%" },
        }}
        variant="standard"
        defaultValue={exercise.name}
      />

      <TextField
        sx={{ display: "none" }}
        {...register(`${AddWorkoutFormFields.EXERCISES}.[${exerciseIndex}].id`)}
        defaultValue={exercise._id}
      />

      <SetsContainer>
        <SetLabels />
        <Divider />
        <Sets
          exerciseId={exercise._id}
          exerciseIndex={exerciseIndex}
          removeExercise={removeExercise}
        />
      </SetsContainer>
    </FieldWrapper>
  );
};
//
