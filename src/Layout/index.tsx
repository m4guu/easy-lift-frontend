import React from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

import LeftBar from "./LeftBar";
import TopBar from "./TopBar";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <MainGridContainer container>
      <FirstGridItem item xl={2} lg={3} xs={12}>
        <LeftBar />
      </FirstGridItem>
      <Grid item xl={10} lg={9} xs={12}>
        <SecondGridItem item xl={12}>
          <TopBar />
        </SecondGridItem>
        <ThirdGridItem item xl={12}>
          {props.children}
        </ThirdGridItem>
      </Grid>
    </MainGridContainer>
  );
};

const MainGridContainer = styled(Grid)(({ theme }) => ({
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  overflow: "hidden",
  [theme.breakpoints.down("lg")]: { overflowY: "visible", display: "inherit" },
}));

const FirstGridItem = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.background.layout,
  [theme.breakpoints.up("lg")]: { height: "100%" },
}));

const SecondGridItem = styled(Grid)(({ theme }) => ({
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

const ThirdGridItem = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: "4rem",
  [theme.breakpoints.up("lg")]: { height: "90%" },
}));

export default Layout;
