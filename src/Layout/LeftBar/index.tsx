import React from "react";

import { useGetUserRoleAndImage } from "../../store/redux-store/slices/user/user.hooks";

import { Logo, ThemeModeSwitch } from "../../components";
import Navigation from "./Navigation";
import WeightChart from "./WeightChart";
import AccountSettings from "../TopBar/AccountSettings";
import TemporaryDrawer from "./MenuDrawer";

import {
  SectionContainer,
  LeftBarContainer,
  MenuDrawerBox,
  AccountSettingsBox,
  NavigationContainer,
  ThemeSwitchContainer,
} from "./LeftBar.styles";

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

export default LeftBar;
