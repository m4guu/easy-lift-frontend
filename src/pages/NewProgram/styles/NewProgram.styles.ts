import { Box, Stepper } from "@mui/material";
import { styled } from "@mui/system";

export const FormWrapper = styled("form")(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));

export const FirstFormStepWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
  gap: theme.spacing(1),
  width: "40%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const SecondFormStepWrapper = styled(Box)({});

export const ThirdFormStepWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(1),
  marginLeft: "auto",
  marginRight: "auto",
  width: "40%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

export const FormActions = styled(Box)(({ theme }) => ({
  textAlign: "right",
  marginTop: theme.spacing(1),
}));

export const FormStepper = styled(Stepper)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
