import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const FormContainer = styled(Box)(({ theme }) => ({}));

export const FormWrapper = styled("form")(({ theme }) => ({
  display: "flex",
  margin: `${theme.spacing(2)} 0`,
  justifyContent: "center",
  gap: theme.spacing(2),
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  minWidth: "15%",
  flexDirection: "column",
  alignItems: "cemter",
  gap: theme.spacing(2),
}));

export const BoxHeader = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.primary.main,
}));

export const FormActions = styled(Box)(({ theme }) => ({}));
