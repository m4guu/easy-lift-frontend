import React from "react";

import { Alert, Divider, Button, Modal, Box } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";
import { useUserExerciseProgress } from "../../hooks/queryHooks/userProgressHooks/useUserExerciseProgress";

import { Chart } from "../../utils/LineChart";

import { Status } from "../../shared/enums";
import { chartOptions } from "./constans";

import { ExerciseProgresList } from "./ExerciseProgressContent/ExerciseProgresList";
import { SectionContainer, SectionHeader } from "../../components";

const ExerciseProgressModal: React.FC<{
  exerciseId: string;
  isOpen: boolean;
  closeModal: () => void;
}> = ({ exerciseId, closeModal, isOpen }) => {
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
    <Modal open={isOpen} onClose={closeModal}>
      <ModalBox>
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

          <Button onClick={closeModal}>close modal</Button>
        </SectionContainer>
      </ModalBox>
    </Modal>
  );
};

const ModalBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  border: "0.2rem solid #000",
  borderRadius: "2rem",
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export default ExerciseProgressModal;
