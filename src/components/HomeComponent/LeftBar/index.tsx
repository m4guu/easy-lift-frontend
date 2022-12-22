import React from "react";

import { styled } from "@mui/system";

import { Logo, ThemeModeSwitch } from "../..";
import Navigation from "./Navigation";
import WeightChart from "./WeightChart";

const LeftBar: React.FC = () => {
  return (
    <LeftBarSection>
      <LeftBarContainer>
        <Logo />
        <WeightChart />
        <Navigation />
      </LeftBarContainer>
      <ThemeSwitchContainer>
        <ThemeModeSwitch />
      </ThemeSwitchContainer>
    </LeftBarSection>
  );
};

const LeftBarSection = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  borderRight: `solid 3px ${theme.palette.secondary.main}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));

const LeftBarContainer = styled("div")(({ theme }) => ({
  borderBottom: `solid 1.3px ${theme.palette.secondary.light_1}`,
  textAlign: "center",
}));

const ThemeSwitchContainer = styled("div")(({ theme }) => ({
  borderTop: `solid 1.3px ${theme.palette.secondary.light_1}`,
}));

export default LeftBar;
