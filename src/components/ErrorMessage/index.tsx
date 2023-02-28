import React from "react";

import { FormHelperText, Typography } from "@mui/material";
import { styled } from "@mui/system";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const ErrorMessage: React.FCWithChildren = ({ children }) => {
  return (
    <FormErrorText error>
      <WarningIcon />
      <Message>{children}</Message>
    </FormErrorText>
  );
};

const FormErrorText = styled(FormHelperText)({
  display: "flex",
  alignItems: "center",
});

const WarningIcon = styled(WarningAmberIcon)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    fontSize: "large",
  },
}));
const Message = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.9rem",
  },
}));
export default ErrorMessage;
