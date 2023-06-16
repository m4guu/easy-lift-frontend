import React from "react";

import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/system";

export interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: JSX.Element;
  header: string;
  description?: string;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  isOpen,
  onClose,
  form,
  header,
  description,
}) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalContainer>
        <Header color="primary">{header}</Header>
        {description && <ModalDescription>{description}</ModalDescription>}
        <NoPaddingDivider />
        {form}

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
  minWidth: "25rem",
  [theme.breakpoints.down("sm")]: {
    width: "95%",
  },
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
  maxWidth: "30rem",
}));

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `${theme.spacing(1)} -${theme.spacing(2)}`,
}));

export default UpdateUserModal;
