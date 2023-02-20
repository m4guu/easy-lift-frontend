import React from "react";

import { Box, useTheme } from "@mui/material";
import { styled } from "@mui/system";

import { weightRepsMask, tempoMask } from "./constans";

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
        mask={weightRepsMask}
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
        mask={tempoMask}
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
  const theme = useTheme();
  return (
    <FieldContainer>
      <ControlledTextField
        fieldName={`${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].sets[${setIndex}].archived`}
        mask={weightRepsMask}
        placeholder="kg x reps"
        variant="standard"
        textColor={theme.palette.primary.main}
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
