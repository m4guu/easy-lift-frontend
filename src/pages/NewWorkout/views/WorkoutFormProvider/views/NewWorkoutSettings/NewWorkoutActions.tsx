import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";

import { useConfirmModal } from "../../../../../../hooks/modalHooks/Confirm/useConfirmModal";

import { Confirm } from "../../../../../../modals";
import { SettingAction } from "../../../../../../components/DotsSettings";
import { DotsSettings } from "../../../../../../components";
import { PATHS } from "../../../../../paths";

enum NewWorkoutActions {
  SAVE_AS_DRAFT = "save as draft",
  RESET_FORM = "clear form",
}

interface NewWorkoutSettingsProps {
  saveDraft: () => Promise<void>;
  resetForm: () => void;
}

export const NewWorkoutSettings: React.FC<NewWorkoutSettingsProps> = ({
  saveDraft,
  resetForm,
}) => {
  const { open: openConfirmModal, isOpen, close } = useConfirmModal();
  const navigate = useNavigate();

  const saveAsDraft = () => {
    navigate(PATHS.NEW_WORKOUT);
    saveDraft();
  };

  const newWorkoutActions: SettingAction[] = [
    {
      id: uuidv4(),
      name: NewWorkoutActions.SAVE_AS_DRAFT,
      onClick: saveAsDraft,
      icon: <SaveAsSharpIcon fontSize="small" color="info" />,
    },
    {
      id: uuidv4(),
      name: NewWorkoutActions.RESET_FORM,
      onClick: openConfirmModal,
      icon: <RestoreFromTrashIcon fontSize="small" color="error" />,
    },
  ];
  return (
    <Container>
      <DotsSettings actions={newWorkoutActions} />
      <Confirm
        onConfirm={() => {
          resetForm();
          close();
        }}
        confirmTitle="clear form"
        isOpen={isOpen}
        closeModal={close}
      />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
}));
