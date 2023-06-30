import React from "react";

import { Divider, Button, Modal, Box } from "@mui/material";
import { styled } from "@mui/system";

import { useUserExerciseProgress } from "../../hooks/queryHooks/userProgressHooks/useUserExerciseProgress";

import { Chart } from "../../utils/LineChart";

import { chartOptions } from "./constans";

import { ExerciseProgresList } from "./ExerciseProgressContent/ExerciseProgresList";
import { SectionContainer, SectionHeader, StatusBar } from "../../components";

const ExerciseProgressModal: React.FC<{
  exerciseId: string;
  userId: string;
  isOpen: boolean;
  closeModal: () => void;
}> = ({ exerciseId, userId, closeModal, isOpen }) => {
  const {
    status,
    error,
    data: userExerciseProgress,
  } = useUserExerciseProgress(exerciseId, userId);

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

          {userExerciseProgress && (
            <>
              <Chart labels={labels} data={data} options={chartOptions} />
              <NoPaddingDivider />
              <ExerciseProgresList exerciseProgress={userExerciseProgress!} />
            </>
          )}

          <StatusBar status={status} error={error} />

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
  border: `thin solid ${theme.palette.others.border_color}`,
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)}`,
}));

export default ExerciseProgressModal;
