import React from "react";
import { useLocation } from "react-router-dom";

import { Theme, useMediaQuery } from "@mui/material";

import { PATHS } from "../pages/paths";

import LeftBar from "./LeftBar";
import TopBar from "./TopBar";
import {
  MainGridContainer,
  FirstGridItem,
  GridWrapper,
  SecondGridItem,
  ThirdGridItem,
  HelpBox,
} from "./Layout.styles";

const Layout: React.FCWithChildren = ({ children }) => {
  const { pathname: currentPath } = useLocation();
  const isBelowLg = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  return (
    <MainGridContainer container>
      <FirstGridItem item lg={3} xs={12}>
        <LeftBar />
      </FirstGridItem>

      <GridWrapper item lg={9} xs={12}>
        <SecondGridItem item xl={12}>
          {(currentPath === PATHS.NEW_PROGRAM ||
            currentPath === PATHS.NEW_WORKOUT) &&
            !isBelowLg && <TopBar />}
          {currentPath !== PATHS.NEW_PROGRAM &&
            currentPath !== PATHS.NEW_WORKOUT && <TopBar />}
        </SecondGridItem>

        <ThirdGridItem item xl={12}>
          {children}
          <HelpBox />
        </ThirdGridItem>
      </GridWrapper>
    </MainGridContainer>
  );
};

export default Layout;
