import React from "react";

import { Alert, Divider } from "@mui/material";

import { useUserContext } from "../../contexts/userContext";
import { useUserExerciseProgress } from "../../hooks/queryHooks/userProgressHooks/useUserExerciseProgress";

import { Chart } from "../../utils/LineChart";

import { Status } from "../../shared/enums";
import { chartOptions } from "./constans";

import { ExerciseProgresList } from "./ExerciseProgressContent/ExerciseProgresList";
import { SectionContainer, SectionHeader } from "../../components";

const ExerciseProgress: React.FC<{
  exerciseId: string;
  closeModal: () => void;
}> = ({ exerciseId, closeModal }) => {
  const { user } = useUserContext();

  const {
    status,
    error,
    data: userExerciseProgress,
  } = useUserExerciseProgress(user?.id, exerciseId);

  const labels: string[] = userExerciseProgress
    ? userExerciseProgress.map((exerciseProgress) => exerciseProgress.date)
    : [];
  const data: number[] = userExerciseProgress
    ? userExerciseProgress.map((exerciseProgress) => exerciseProgress.repMax)
    : [];

  const name =
    userExerciseProgress?.length === 1
      ? userExerciseProgress[0].exerciseName
      : "";

  return (
    <SectionContainer>
      <SectionHeader>your {name} progress</SectionHeader>

      {status === Status.LOADING && <div>loading...</div>}

      {!!userExerciseProgress && userExerciseProgress?.length !== 0 ? (
        <>
          <Chart labels={labels} data={data} options={chartOptions} />
          <Divider />
          <ExerciseProgresList exerciseProgress={userExerciseProgress!} />
        </>
      ) : (
        <Alert variant="outlined" severity="info">
          There are no progress in this exercise yet.
        </Alert>
      )}

      <button type="button" onClick={closeModal}>
        close modal
      </button>
    </SectionContainer>
  );
};

export default ExerciseProgress;
