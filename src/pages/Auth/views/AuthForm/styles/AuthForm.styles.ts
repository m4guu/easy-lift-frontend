import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FormWrapper = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  width: "13.5rem",
  gap: theme.spacing(2),
}));
export const InputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
}));

export const FormActions = styled(Box)({});
