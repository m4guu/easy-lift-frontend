import React from "react";

import { Box, Modal, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

interface ConfirmProps {
  onConfirm: (...event: any) => void;
  confirmTitle: string;
  isOpen: boolean;
  closeModal: () => void;
}

const Confirm: React.FC<ConfirmProps> = ({
  onConfirm,
  confirmTitle,
  isOpen,
  closeModal,
}) => {
  return (
    <Modal open={isOpen} onClose={closeModal}>
      <ModalContainer>
        <Header color="primary">are you sure ?</Header>
        <ModalMessage>
          Do you really want to {confirmTitle}? This process cannot be undone.
        </ModalMessage>

        <ModalAction>
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={onConfirm}
          >
            {confirmTitle}
          </Button>

          <Button
            size="small"
            variant="outlined"
            color="info"
            onClick={closeModal}
          >
            close
          </Button>
        </ModalAction>
      </ModalContainer>
    </Modal>
  );
};
const ModalContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: theme.spacing(2),
  border: `thin solid ${theme.palette.error.main}`,
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.down("md")]: {
    width: "90% ",
  },
}));

const Header = styled(Typography)({
  fontSize: "1.2rem",
  textTransform: "uppercase",
});

const ModalMessage = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`,
}));

const ModalAction = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: theme.spacing(1),
}));

export default Confirm;
