import React, { useState } from "react";

import { Box, Button, ButtonProps } from "@mui/material";
import { Confirm } from "../../modals";

interface ButtonWithConfirmationProps extends Omit<ButtonProps, "children"> {
  onConfirm: (...event: any) => void;
}

const ButtonWithConfirmation: React.FCWithChildren<
  ButtonWithConfirmationProps
> = ({ children, onConfirm, ...muiProps }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openConfirmModal = () => {
    setIsModalOpen(true);
  };
  const closeConfirmModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box>
      <Button onClick={openConfirmModal} {...muiProps}>
        {children}
      </Button>

      <Confirm
        onConfirm={onConfirm}
        isOpen={isModalOpen}
        closeModal={closeConfirmModal}
      >
        {children}
      </Confirm>
    </Box>
  );
};

export default ButtonWithConfirmation;
