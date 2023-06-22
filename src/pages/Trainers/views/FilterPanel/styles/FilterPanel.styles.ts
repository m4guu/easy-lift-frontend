import {
  FormControl,
  FormControlLabel,
  Switch,
  Autocomplete,
} from "@mui/material";
import { styled } from "@mui/system";

export const Form = styled(FormControl)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(1),
  margin: `${theme.spacing(2)} 0`,
}));

export const PersonalTrainingSwitch = styled(Switch)({});

export const Gyms = styled(Autocomplete)({});

export const ControlLabel = styled(FormControlLabel)(({ theme }) => ({
  margin: 0,
  marginLeft: theme.spacing(1),
}));
