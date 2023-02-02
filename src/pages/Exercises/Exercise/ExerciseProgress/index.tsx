import React from "react";
import { useParams } from "react-router-dom";

import { Alert, Divider } from "@mui/material";

import { useUserContext } from "../../../../contexts/userContext";
import { useUserExerciseProgress } from "../../../../hooks/queryHooks/userProgressHooks/useUserExerciseProgress";

import { Chart } from "../../../../utils/LineChart";

import { Status } from "../../../../shared/enums";
import { chartOptions } from "./constans";

import { ExerciseProgresList } from "./ExerciseProgressContent/ExerciseProgresList";
import { SectionContainer, SectionHeader } from "../../../../components";

const ExerciseProgressPage: React.FC = () => {
  const { user } = useUserContext();
  const { exerciseId } = useParams();

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

  return (
    <SectionContainer>
      <SectionHeader>your bench press progress</SectionHeader>
      {status === Status.LOADING && <div>loading...</div>}

      {!!userExerciseProgress && userExerciseProgress?.length !== 0 ? (
        <>
          <Chart labels={labels} data={data} options={chartOptions} />
          <Divider />
          <ExerciseProgresList exerciseProgress={userExerciseProgress!} />
        </>
      ) : (
        <Alert variant="outlined" severity="info">
          There are no progress yet.
        </Alert>
      )}
    </SectionContainer>
  );
};

const ExerciseProgress = ExerciseProgressPage;
export default ExerciseProgress;
