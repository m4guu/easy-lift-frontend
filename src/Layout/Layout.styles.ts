import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

export const MainGridContainer = styled(Grid)(({ theme }) => ({
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: {
    overflowY: "visible",
    display: "inherit",
  },
}));

export const FirstGridItem = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.up("lg")]: {
    height: "100%",
  },
}));

export const GridWrapper = styled(Grid)({
  height: "100%",
});

export const SecondGridItem = styled(Grid)(({ theme }) => ({
  zIndex: 1000,
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.up("lg")]: {
    height: "8%",
  },
  [theme.breakpoints.down("lg")]: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
}));

export const ThirdGridItem = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  overflowY: "scroll",

  [theme.breakpoints.up("lg")]: {
    height: "92%",
  },
}));
