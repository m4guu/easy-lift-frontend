import { Box } from "@mui/material";
import { styled } from "@mui/system";

export const FormContainer = styled(Box)(({ theme }) => ({
  width: "20%",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: theme.spacing(2),
  [theme.breakpoints.down("lg")]: {
    width: "30%",
  },
  [theme.breakpoints.down("md")]: {
    width: "45%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const FormWrapper = styled("form")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const FormActions = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
