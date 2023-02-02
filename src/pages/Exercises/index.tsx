import React from "react";

import { Box, Alert } from "@mui/material";
import { styled } from "@mui/system";

import { useExercises } from "../../hooks/queryHooks/exerciseDB/useExercises";

import { Status } from "../../shared/enums";
import { ExerciseList } from "./ExercisesContent/ExerciseList";
import { SectionContainer, SectionHeader } from "../../components";

const ExercisesPage: React.FC = () => {
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
        <ExerciseList exercises={exercises!} />
      )}
    </SectionContainer>
  );
};

const ExerciseFilterContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
}));
const Exercises = ExercisesPage;
export default Exercises;
