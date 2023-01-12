import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

export const MainGridContainer = styled(Grid)(({ theme }) => ({
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: { overflowY: "visible", display: "inherit" },
}));

export const FirstGridItem = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.up("lg")]: { height: "100%" },
}));

export const SecondGridItem = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.up("lg")]: { height: "10%" },
  [theme.breakpoints.down("lg")]: {
    zIndex: "1000",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
}));

export const ThirdGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: "4rem",
  [theme.breakpoints.up("lg")]: { height: "90%" },
}));
