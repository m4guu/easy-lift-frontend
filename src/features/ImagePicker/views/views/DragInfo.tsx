import React from "react";

import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
import TaskIcon from "@mui/icons-material/Task";
import SimCardAlertIcon from "@mui/icons-material/SimCardAlert";

interface DragInfoProps {
  isDragAccept: boolean;
  isDragReject: boolean;
}

export const DragInfo: React.FC<DragInfoProps> = ({
  isDragAccept,
  isDragReject,
}) => {
  //   let taskIconColor = "";

  return (
    <DragInfoContainer>
      {isDragAccept && <TaskIcon color="success" />}
      {isDragReject && <SimCardAlertIcon color="error" />}

      <DragInfoTitle
        color={isDragAccept ? "success.main" : "error"}
        variant="caption"
      >
        {isDragAccept && "File Accepted"}
        {isDragReject && "Wrong file extension."}
      </DragInfoTitle>
    </DragInfoContainer>
  );
};

const DragInfoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const DragInfoTitle = styled(Typography)({
  fontSize: "0.8rem",
});
