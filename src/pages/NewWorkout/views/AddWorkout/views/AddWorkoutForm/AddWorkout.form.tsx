import { styled, useTheme, Divider } from "@mui/material";

import { AddWorkoutFormFields } from "../../../../../hooks/formHooks/workout/useNewWorkoutForm";

import { ControlledTextField } from "../../../../../features";

import { SetLabels } from "./SetLabels";

import {
  FieldWrapper,
  ExerciseTitle,
  SetsContainer,
} from "./styles/addWorkoutForm.styles";

// Workout title //
export const WorkoutTitle = styled(() => (
  <ControlledTextField
    variant="outlined"
    size="small"
    label="Workout Title"
    fieldName={AddWorkoutFormFields.WORKOUT_TITLE}
    placeholder="Add workout title..."
  />
))``;

// Start time //
export const StartTime = styled(() => (
  <ControlledTextField
    variant="outlined"
    size="small"
    label="Start Time"
    type="date"
    fieldName={AddWorkoutFormFields.START_TIME}
  />
))``;

// Exercise //
type ExerciseProps = {
  exercise: {
    id: string;
    name: string;
  };
};

export const Exercise: React.FC<ExerciseProps> = ({ exercise }) => {
  const theme = useTheme();
  return (
    <FieldWrapper>
      <ExerciseTitle variant="subtitle1" color="primary">
        {exercise.name}
      </ExerciseTitle>

      <SetsContainer>
        <SetLabels />
        <Divider />
      </SetsContainer>
    </FieldWrapper>
  );
};
