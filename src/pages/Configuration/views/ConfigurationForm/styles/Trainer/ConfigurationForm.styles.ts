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
    width: "35%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  [theme.breakpoints.down("md")]: {
    width: "50%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const FormBox = styled(Box)(({ theme }) => ({
  display: "flex",
  minWidth: "12%",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const BoxHeader = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  color: theme.palette.primary.main,
}));

export const FormActions = styled(Box)(({ theme }) => ({}));

export const BoxImage = styled(Box)(({ theme }) => ({
  width: "70vh",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("lg")]: {
    width: "100%",
  },
}));
