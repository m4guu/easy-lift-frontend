import React from "react";
import { UseFieldArrayAppend } from "react-hook-form";

import { Box, Alert, Button, Modal } from "@mui/material";
import { styled } from "@mui/system";

import { useExercises } from "../../hooks/queryHooks/exerciseDB/useExercises";
import {
  AddWorkoutForm,
  AddWorkoutFormFields,
} from "../../hooks/formHooks/workout/useNewWorkoutForm";

import { Status } from "../../shared/enums";
import { ExerciseList } from "./ExercisesContent/ExerciseList";
import { SectionContainer, SectionHeader } from "../../components";

type ExercisesProps = {
  appendExercise: UseFieldArrayAppend<
    AddWorkoutForm,
    AddWorkoutFormFields.EXERCISES
  >;
  isOpen: boolean;
  closeModal: () => void;
};

const ExercisesModal: React.FC<ExercisesProps> = ({
  appendExercise,
  closeModal,
  isOpen,
}) => {
  const { status, error, data: exercises } = useExercises();

  return (
    <ExercisesMuiModal
      open={isOpen}
      onClose={closeModal}
      slotProps={{ backdrop: { style: { backgroundColor: "inherit" } } }}
    >
      <Box>
        <SectionContainer>
          <SectionHeader>Exercise list</SectionHeader>

          <ExerciseFilterContainer>
            <Box>search ...</Box>
            <Box>target -categories</Box>
          </ExerciseFilterContainer>

          {status === Status.LOADING && <div>loading...</div>}

          {exercises && exercises.length === 0 ? (
            <Alert variant="outlined" severity="error">
              An Error has occurred. Please try again later.
            </Alert>
          ) : (
            <ExerciseList
              exercises={exercises!}
              appendExercise={appendExercise}
              closeModal={closeModal}
            />
          )}

          <CloseModalButton
            onClick={closeModal}
            color="error"
            variant="contained"
          >
            close modal
          </CloseModalButton>
        </SectionContainer>
      </Box>
    </ExercisesMuiModal>
  );
};

const ExerciseFilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));

const CloseModalButton = styled(Button)({
  position: "fixed",
  right: 5,
  top: 5,
});

const ExercisesMuiModal = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  overflowY: "scroll",
}));

export default ExercisesModal;
