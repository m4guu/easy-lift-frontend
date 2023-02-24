import React from "react";
import {
  UseFieldArrayReturn,
  useWatch,
  Control,
  FieldValues,
  UseFieldArrayUpdate,
} from "react-hook-form";

import { IconButton } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";

import { ExerciseFormActions } from "../../../../../../../../../shared/enums";
import { AddWorkoutFormFields } from "../../../../../../../../../hooks/formHooks/workout/useNewWorkoutForm";

export const Add: React.FC<{ addNewSet: () => void }> = ({ addNewSet }) => {
  return (
    <IconBtn onClick={addNewSet}>
      <AddIcon color="primary" />
    </IconBtn>
  );
};

type DeleteExerciseProps = {
  exerciseIndex: number;
  removeExercise: UseFieldArrayReturn[ExerciseFormActions.REMOVE];
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
  updateSet: UseFieldArrayUpdate<FieldValues, `exercises.${number}.sets`>;
};
export const SetDone: React.FC<SetDoneProps> = ({
  exerciseIndex,
  setIndex,
  control,
  updateSet,
}) => {
  const set = useWatch({
    control,
    name: `${AddWorkoutFormFields.EXERCISES}[${exerciseIndex}].sets[${setIndex}]`,
  });

  // ? question: how to check validation of this value? [archived and goal]
  if (set.archived || !set.goal) {
    return null;
  }

  const update = () => {
    updateSet(setIndex, {
      ...set,
      archived: set.goal,
    });
  };
  return (
    <IconButton onClick={update}>
      <DoneIcon fontSize="small" color="primary" />
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
