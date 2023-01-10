import React from "react";

import { styled } from "@mui/system";

import { useGetUserRoleAndImage } from "../../store/redux-store/slices/user/user.hooks";

import { Logo, ThemeModeSwitch } from "../../components";
import Navigation from "./Navigation";
import WeightChart from "./WeightChart";
import AccountSettings from "../TopBar/AccountSettings";
import TemporaryDrawer from "./MenuDrawer";

const LeftBar: React.FC = () => {
  const { role, image } = useGetUserRoleAndImage();

  return (
    <SectionContainer>
      <LeftBarContainer>
        <MenuDrawerBox>
          <TemporaryDrawer />
        </MenuDrawerBox>
        <Logo />
        <AccountSettingsBox>
          <AccountSettings image={image} />
        </AccountSettingsBox>
        {role === "user" ? <WeightChart /> : null}
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </LeftBarContainer>
      <ThemeSwitchContainer>
        <ThemeModeSwitch />
      </ThemeSwitchContainer>
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  height: "100%",
  borderRight: `solid thin ${theme.palette.others.border_color}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("lg")]: {
    borderBottom: `solid thin ${theme.palette.others.border_color}`,
  },
}));

const LeftBarContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("lg")]: {
    borderBottom: `solid thin ${theme.palette.others.border_color}`,
  },
  [theme.breakpoints.down("lg")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

const MenuDrawerBox = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("lg")]: {
    display: "block",
  },
}));

const NavigationContainer = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const ThemeSwitchContainer = styled("div")(({ theme }) => ({
  borderTop: `solid thin ${theme.palette.others.border_color}`,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const AccountSettingsBox = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));

export default LeftBar;
