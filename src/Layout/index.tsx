import React from "react";

import LeftBar from "./LeftBar";
import TopBar from "./TopBar";
import {
  MainGridContainer,
  FirstGridItem,
  GridWrapper,
  SecondGridItem,
  ThirdGridItem,
} from "./Layout.styles";

const Layout: React.FCWithChildren = ({ children }) => {
  return (
    <MainGridContainer container>
      <FirstGridItem item xl={2} lg={3} xs={12}>
        <LeftBar />
      </FirstGridItem>
      <GridWrapper item xl={10} lg={9} xs={12}>
        <SecondGridItem item xl={12}>
          <TopBar />
        </SecondGridItem>
        <ThirdGridItem item xl={12}>
          {children}
        </ThirdGridItem>
      </GridWrapper>
    </MainGridContainer>
  );
};

export default Layout;
