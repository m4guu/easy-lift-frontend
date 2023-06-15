import { List, Typography, Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

export const SegmentTitle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  lineHeight: 1.5,
  [theme.breakpoints.up("lg")]: {
    fontSize: "0.9rem",
  },
}));

export const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0  -${theme.spacing(2)}`,
}));

// TrainerPrograms styles
export const ProgramsContainer = styled(Box)({});
export const ProgramList = styled(List)({});
// PersonalTrainingInfo styles
export const PersonalTrainingContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));
export const Header = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));
