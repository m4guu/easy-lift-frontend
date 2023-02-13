import { useFormContext } from "react-hook-form";

import { Divider, styled, TextField } from "@mui/material";

import { ControlledTextField } from "../../../../../../features";
import { AddWorkoutFormFields } from "../../../../../../hooks/formHooks/workout/useNewWorkoutForm";

import { SetLabels } from "./views/SetLabels/SetLabels";
import { Sets } from "./views/Sets/Sets";

import { FieldWrapper, SetsContainer } from "./styles/addWorkoutForm.styles";

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
  <ControlledTextField
    variant="standard"
    size="small"
    label="Start Time"
    type="datetime-local"
    fieldName={AddWorkoutFormFields.START_TIME}
  />
))``;
//

// Exercise //
type ExerciseProps = {
  exercise: {
    id: string;
    name: string;
  };
  exerciseIndex: number;
};

export const Exercise: React.FC<ExerciseProps> = ({
  exercise,
  exerciseIndex,
}) => {
  const { register } = useFormContext();
  return (
    <FieldWrapper>
      <TextField
        size="small"
        {...register(
          `${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].name`
        )}
        InputProps={{ readOnly: true, disableUnderline: true }}
        variant="standard"
        defaultValue={exercise.name}
      />

      <TextField
        // question: i need in form: data like exercise name or id, its ok to manage uncontrolled input like this ?
        sx={{ display: "none" }}
        {...register(`${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].id`)}
        defaultValue={exercise.id}
      />
      <SetsContainer>
        <SetLabels />
        <Divider />
        <Sets exerciseId={exercise.id} exerciseIndex={exerciseIndex} />
      </SetsContainer>
    </FieldWrapper>
  );
};
//
