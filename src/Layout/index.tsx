import React from "react";

import Grid from "@mui/material/Grid";

import LeftBar from "./LeftBar";
import TopBar from "./TopBar";
import {
  MainGridContainer,
  FirstGridItem,
  SecondGridItem,
  ThirdGridItem,
} from "./Layout.styles";

const Layout: React.FCWithChildren = ({ children }) => {
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
          {children}
        </ThirdGridItem>
      </Grid>
    </MainGridContainer>
  );
};

export default Layout;
