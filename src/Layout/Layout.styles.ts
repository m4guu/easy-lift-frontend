import { Grid, Box } from "@mui/material";
import { styled } from "@mui/system";

export const MainGridContainer = styled(Grid)({
  position: "absolute",
  display: "flex",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  overflow: "hidden",
});

export const FirstGridItem = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.up("lg")]: {
    height: "100%",
  },
}));

export const GridWrapper = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

export const SecondGridItem = styled(Grid)(({ theme }) => ({
  zIndex: 1000,
  flexBasis: "auto !important",
  backgroundColor: theme.palette.background.layout,

  [theme.breakpoints.down("lg")]: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
}));

export const ThirdGridItem = styled(Grid)(({ theme }) => ({
  flexDirection: "column",
  overflowY: "scroll",
  flex: "1!important",
  [theme.breakpoints.down("lg")]: {
    // marginBottom: "62px",
    // overflowY: "hidden",
  },

  // Add custom scrollbar styles
  "::-webkit-scrollbar": {
    width: "4px",
    height: "4px",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "8px",
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "8px",
  },
}));

export const HelpBox = styled(Box)(({ theme }) => ({
  height: "125px",
  width: "100%",
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));
