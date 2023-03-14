import React from "react";
import { UseFieldArrayAppend } from "react-hook-form";

import { Box, Typography, Button, Modal } from "@mui/material";
import { styled } from "@mui/system";

import { useExercises } from "../../hooks/queryHooks/exerciseDB/useExercises";
import {
  AddWorkoutForm,
  AddWorkoutFormFields,
} from "../../hooks/formHooks/workout/useNewWorkoutForm";

import { Status } from "../../shared/enums";
import { ExerciseList } from "./views/ExercisesContent/ExerciseList";
import { SectionContainer, SectionHeader } from "../../components";
import { FilterPanel } from "./views/FilterPanel/FilterPanel";
import { useExerciseFilter } from "../../hooks/filters/useExerciseFilter";

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

  const { updatedExercises, filterPanelProps } = useExerciseFilter(exercises);

  return (
    <ExercisesMuiModal
      open={isOpen}
      onClose={closeModal}
      slotProps={{ backdrop: { style: { backgroundColor: "inherit" } } }}
    >
      <Box>
        <SectionContainer>
          <SectionHeader>Exercise list</SectionHeader>

          <FilterPanel filterHandlers={filterPanelProps} />

          {status === Status.LOADING && <div>loading...</div>}

          {updatedExercises?.length === 0 ? (
            <Typography>No search result</Typography>
          ) : (
            <ExerciseList
              exercises={updatedExercises}
              appendExercise={appendExercise}
              closeModal={closeModal}
            />
          )}

          <CloseModalButton
            onClick={closeModal}
            color="error"
            variant="contained"
            size="small"
          >
            close modal
          </CloseModalButton>
        </SectionContainer>
      </Box>
    </ExercisesMuiModal>
  );
};

const CloseModalButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(2),
  top: theme.spacing(2),
}));

const ExercisesMuiModal = styled(Modal)(({ theme }) => ({
  margin: 0,
  backgroundColor: theme.palette.background.default,
  overflowY: "scroll",
  "::-webkit-scrollbar": {
    display: "none",
  },
}));

export default ExercisesModal;
