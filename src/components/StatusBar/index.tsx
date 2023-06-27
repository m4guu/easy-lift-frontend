import React from "react";

import { Box, Typography, CircularProgress } from "@mui/material";

import { Status } from "../../shared/enums";
import { Error as ErrorType } from "../../shared/interfaces";

type StatusBarProps = {
  status: "error" | "loading" | "success";
  error: ErrorType | null;
  noItems?: boolean;
  itemName?: string;
};

const StatusBar: React.FC<StatusBarProps> = ({
  status,
  error,
  noItems,
  itemName,
}) => {
  return (
    <Box>
      {status === Status.LOADING && <CircularProgress />}
      {status === Status.ERROR && error && (
        <Typography color="error">{error.message}</Typography>
      )}
      {noItems && (
        <Typography color="info">
          There are no {itemName || "fields"} yet.
        </Typography>
      )}
    </Box>
  );
};

export default StatusBar;
