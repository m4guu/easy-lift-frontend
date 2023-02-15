import { useState } from "react";

import { Modal, Box } from "@mui/material";
import { styled } from "@mui/system";

import { Exercises } from "../../../modals";

export const useExerciseModal = (appendExercise: any) => {
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
      <ExercisesModal
        open={isOpen}
        onClose={close}
        slotProps={{ backdrop: { style: { backgroundColor: "inherit" } } }}
      >
        <Box>
          <Exercises appendExercise={appendExercise} closeModal={close} />
        </Box>
      </ExercisesModal>
    ),
  };
};

const ExercisesModal = styled(Modal)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  overflowY: "scroll",
}));
