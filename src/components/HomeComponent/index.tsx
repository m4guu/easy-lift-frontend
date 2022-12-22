import React from "react";

import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

import HomeContent from "./HomeContent";
import TopBar from "./TopBar";
import LeftBar from "./LeftBar";

const HomeComponent: React.FC = () => {
  return (
    <MainGridContainer container>
      <FirstGridItem item xs={2}>
        <LeftBar />
      </FirstGridItem>
      <Grid item xs={10}>
        <SecondGridItem item xs={12}>
          <TopBar />
        </SecondGridItem>
        <ThirdGridItem item xs={12}>
          <HomeContent />
        </ThirdGridItem>
      </Grid>
    </MainGridContainer>
  );
};

const MainGridContainer = styled(Grid)({
  position: "absolute",
  left: "0",
  right: "0",
  top: "0",
  bottom: "0",
  overflow: "hidden",
});
const FirstGridItem = styled(Grid)({
  height: "100%",
});
const SecondGridItem = styled(Grid)({
  height: "10%",
});
const ThirdGridItem = styled(Grid)({
  height: "90%",
});

export default HomeComponent;
