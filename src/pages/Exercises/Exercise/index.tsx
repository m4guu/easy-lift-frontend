import React from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { useExercise } from "../../../hooks/queryHooks/exerciseDB/useExercise";

import { Status } from "../../../shared/enums";
import { SectionContainer, SectionHeader } from "../../../components";

const ExercisePage: React.FC = () => {
  const { exerciseId } = useParams();

  const { status, error, data: exercise } = useExercise(exerciseId);
  console.log(exercise);

  return (
    <SectionContainer>
      {status === Status.LOADING && <div>loading...</div>}
      {status === Status.ERROR && <div>error</div>}
      {exercise ? (
        <>
          <SectionHeader>{exercise[0].name}</SectionHeader>
          <Box>{exercise[0].id}</Box>
        </>
      ) : (
        <div>error, there are no exercise with provided id</div>
      )}
    </SectionContainer>
  );
};

const Exercise = ExercisePage;
export default Exercise;
