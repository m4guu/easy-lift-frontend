import { useState } from "react";

import { Modal, Box } from "@mui/material";
import { styled } from "@mui/system";

import { ExerciseProgress } from "../../../modals";

export const useExerciseProgressModal = (exerciseId: string) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return {
    open,
    close,
    Modal: () => (
      <Modal open={isOpen} onClose={close}>
        <ModalBox>
          <ExerciseProgress exerciseId={exerciseId} closeModal={close} />
        </ModalBox>
      </Modal>
    ),
  };
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
