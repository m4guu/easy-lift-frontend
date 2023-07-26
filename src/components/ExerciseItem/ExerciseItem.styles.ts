import {
  ListItem,
  Box,
  Button,
  List,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { styled } from "@mui/system";

export const ExerciseListItem = styled(ListItem)({
  position: "relative",
  padding: 0,
  "&:hover": {
    transform: "scale(0.99)",
  },
});

export const ExerciseButtton = styled(Button)({
  padding: 0,
  width: "100%",
  "&:hover": {
    backgroundColor: "transparent",
  },
});

export const CustomAccordion = styled(Accordion)({
  background: "none",
  boxShadow: "none",
  width: "100%",
});

export const AccSummary = styled(AccordionSummary)({
  padding: 0,
  display: "flex",
  justifyContent: "space-between",
});
export const AccSummaryContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));
export const AccDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
  display: "flex",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    marginBottom: "3.5rem",
    padding: 0,
  },
}));

export const ExerciseImage = styled("video")(({ theme }) => ({
  width: "15rem",

  [theme.breakpoints.down("sm")]: {
    width: "10rem",
  },
}));

export const ExerciseDetailImage = styled("video")(({ theme }) => ({
  width: "22rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

export const ExtandButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 0,
  [theme.breakpoints.down("sm")]: {
    zIndex: "1000",
    bottom: 10,
  },
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  right: 0,
  bottom: 10,
  gap: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    left: 0,
  },
}));

export const DetailsList = styled(List)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  padding: 0,
  [theme.breakpoints.down("sm")]: {
    marginTop: theme.spacing(1),
    marginLeft: 0,
  },
}));

export const DetailItem = styled(ListItem)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  padding: 0,
});
