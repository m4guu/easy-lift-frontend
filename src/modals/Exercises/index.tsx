import React from "react";

import { Box, Alert, Button } from "@mui/material";
import { styled } from "@mui/system";

import { useExercises } from "../../hooks/queryHooks/exerciseDB/useExercises";

import { Status } from "../../shared/enums";
import { ExerciseList } from "./ExercisesContent/ExerciseList";
import { SectionContainer, SectionHeader } from "../../components";

type ExercisesProps = {
  appendExercise: any;
  closeModal: () => void;
};

const Exercises: React.FC<ExercisesProps> = ({
  appendExercise,
  closeModal,
}) => {
  const { status, error, data: exercises } = useExercises();

  return (
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

      <CloseModalButton onClick={closeModal} color="error" variant="contained">
        close modal
      </CloseModalButton>
    </SectionContainer>
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
export default Exercises;
