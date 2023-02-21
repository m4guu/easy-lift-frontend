import React from "react";
import {
  UseFieldArrayReturn,
  useWatch,
  Control,
  FieldValues,
} from "react-hook-form";

import { IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";

import {
  AddWorkoutFormFields,
  AddWorkoutForm,
} from "../../../../../../../../../hooks/formHooks/workout/useNewWorkoutForm";

export const Add: React.FC<{ addNewSet: () => void }> = ({ addNewSet }) => {
  return (
    <IconBtn onClick={addNewSet}>
      <AddIcon color="primary" />
    </IconBtn>
  );
};

type DeleteExerciseProps = {
  exerciseIndex: number;
  removeExercise: UseFieldArrayReturn["remove"];
};

export const DeleteExercise: React.FC<DeleteExerciseProps> = ({
  exerciseIndex,
  removeExercise,
}) => {
  return (
    <IconBtn onClick={() => removeExercise(exerciseIndex)} size="small">
      <DeleteIcon color="error" />
    </IconBtn>
  );
};

export const Details: React.FC<{ openModal: () => void }> = ({ openModal }) => {
  return (
    <IconBtn onClick={openModal} size="small">
      <InfoIcon />
    </IconBtn>
  );
};

type SetDoneProps = {
  exerciseIndex: number;
  setIndex: number;
  control: Control<FieldValues, any>;
};
export const SetDone: React.FC<SetDoneProps> = ({
  exerciseIndex,
  setIndex,
  control,
}) => {
  // ? question [meeting]: why useWatch doesnt work in this example ?
  const setArchived = useWatch({
    control,
    name: `${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].sets[${setIndex}].archived`,
  });
  if (setArchived) {
    return <Typography>Set Done!</Typography>;
  }
  return (
    <IconButton size="small">
      <DoneIcon color="primary" />
    </IconButton>
  );
};

const IconBtn = styled(IconButton)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`,
  "&:hover": {
    background: "inherit",
    transform: "scale(1.1)",
  },
}));
