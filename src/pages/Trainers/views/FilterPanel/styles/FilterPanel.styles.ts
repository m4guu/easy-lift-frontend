import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";

export const Form = styled("form")(({ theme }) => ({
  width: "100%",
  margin: `${theme.spacing(2)} auto`,
}));

export const ControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  marginLeft: theme.spacing(1),
}));
