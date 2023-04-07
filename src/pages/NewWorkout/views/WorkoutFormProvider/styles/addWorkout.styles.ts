import { LoadingButton } from "@mui/lab";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";

export const FormWrapper = styled(Box)(({ theme }) => ({
  margin: `${theme.spacing(2)} 0`,
}));

export const HeaderInputsWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const FormActionsWrapper = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

export const Submit = styled(LoadingButton)({});

export const ChooseExercise = styled(Button)({
  textDecoration: "none",
});

export const Reset = styled(Button)({});

export const ExercisesWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));
