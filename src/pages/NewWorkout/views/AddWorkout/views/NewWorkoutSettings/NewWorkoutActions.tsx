import React from "react";
import { v4 as uuidv4 } from "uuid";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import SaveAsSharpIcon from "@mui/icons-material/SaveAsSharp";

import { SettingAction } from "../../../../../../components/DotsSettings";
import { DotsSettings } from "../../../../../../components";

enum NewWorkoutActions {
  SAVE_AS_DRAFT = "save as draft",
}

interface NewWorkoutSettingsProps {
  saveDraft: () => Promise<void>;
}

export const NewWorkoutSettings: React.FC<NewWorkoutSettingsProps> = ({
  saveDraft,
}) => {
  const newWorkoutActions: SettingAction[] = [
    {
      id: uuidv4(),
      name: NewWorkoutActions.SAVE_AS_DRAFT,
      onClick: saveDraft,
      icon: <SaveAsSharpIcon fontSize="small" color="info" />,
    },
  ];
  return (
    <Container>
      <DotsSettings actions={newWorkoutActions} />
    </Container>
  );
};

const Container = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(2),
  right: theme.spacing(2),
}));
