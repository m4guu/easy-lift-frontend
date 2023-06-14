import React from "react";

import { Modal, Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

export interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  tForm: JSX.Element;
  tHeader: string;
  tDescription?: string;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  tForm,
  tHeader,
  tDescription,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContainer>
        <Header color="primary">{tHeader}</Header>
        {tDescription && <ModalDescription>{tDescription}</ModalDescription>}
        {tForm}

        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
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
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.background.layout,
  width: "30rem",
}));

const Header = styled(Typography)({
  fontSize: "1.2rem",
  textTransform: "uppercase",
});

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const ModalDescription = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(1)} 0`,
}));
export default UpdateUserModal;
