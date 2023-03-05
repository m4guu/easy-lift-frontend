import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const FormContainer = styled(Box)(({ theme }) => ({}));

export const FormWrapper = styled("form")(({ theme }) => ({
  display: "flex",
  margin: `${theme.spacing(2)} 0`,
  justifyContent: "center",
  gap: theme.spacing(2),
  [theme.breakpoints.down("lg")]: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "25%",
  flexDirection: "column",
  gap: theme.spacing(2),
  [theme.breakpoints.down("lg")]: {
    width: "50%",
  },
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));
export const FormMapBox = styled(Box)(({ theme }) => ({
  display: "flex",
  minWidth: "50%",
  flexDirection: "column",
  gap: theme.spacing(2),

  [theme.breakpoints.down("md")]: {
    minWidth: "100%",
  },
}));
export const BoxHeader = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.primary.main,
}));

export const FormActions = styled(Box)(({ theme }) => ({}));
