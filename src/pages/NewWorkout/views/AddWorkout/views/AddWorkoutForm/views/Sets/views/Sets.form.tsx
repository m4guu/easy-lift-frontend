import React from "react";

import { Box } from "@mui/material";
import { styled } from "@mui/system";

import { ControlledTextField } from "../../../../../../../../../features";
import { AddWorkoutFormFields } from "../../../../../../../../../hooks/formHooks/workout/useNewWorkoutForm";

export const SetGoal: React.FC<{ exerciseIndex: number; setIndex: number }> = ({
  exerciseIndex,
  setIndex,
}) => {
  return (
    <FieldContainer>
      <ControlledTextField
        fieldName={`${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].sets[${setIndex}].goal`}
        mask="0[00] x 0[00]"
        placeholder="kg x reps"
        variant="standard"
        disabledUnderline
      />
    </FieldContainer>
  );
};

export const SetTempo: React.FC<{
  exerciseIndex: number;
  setIndex: number;
}> = ({ exerciseIndex, setIndex }) => {
  return (
    <FieldContainer>
      <ControlledTextField
        fieldName={`${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].sets[${setIndex}].tempo`}
        mask="0-0-0-0"
        placeholder="3-4-1-4"
        variant="standard"
        disabledUnderline
      />
    </FieldContainer>
  );
};

export const SetArchived: React.FC<{
  exerciseIndex: number;
  setIndex: number;
}> = ({ exerciseIndex, setIndex }) => {
  return (
    <FieldContainer>
      <ControlledTextField
        fieldName={`${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].sets[${setIndex}].archived`}
        mask="0[00] x 0[00]"
        placeholder="kg x reps"
        variant="standard"
        disabledUnderline
      />
    </FieldContainer>
  );
};

const FieldContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  width: "25%",
});