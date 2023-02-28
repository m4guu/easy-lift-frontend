import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FormWrapper = styled("form")({
  display: "flex",
});
export const InputWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const FormActions = styled(Box)({});
