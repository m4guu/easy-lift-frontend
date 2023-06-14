import React, { memo } from "react";

import { Button, ButtonProps } from "@mui/material";
import {
  UseUpdateUserModalArgs,
  useUpdateUserModal,
} from "../../hooks/modalHooks/UpdateUser/useUpdateUserModal";
import { UpdateUserModal } from "../../modals";

interface EditButtonWithUpdateModalProps extends ButtonProps {
  updateProps: UseUpdateUserModalArgs;
}

const EditButtonWithUpdateModalComponent: React.FC<
  EditButtonWithUpdateModalProps
> = ({ updateProps, ...other }) => {
  const { openModal, modalProps } = useUpdateUserModal({
    tHeader: updateProps.tHeader,
    tDescription: updateProps.tDescription,
    tForm: updateProps.tForm,
  });
  return (
    <>
      <Button {...other} onClick={() => openModal()}>
        edit
      </Button>
      <UpdateUserModal {...modalProps} />
    </>
  );
};

export const EditButtonWithUpdateModal = memo(
  EditButtonWithUpdateModalComponent
);
