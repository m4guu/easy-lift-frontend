import React from "react";

import { useUserContext } from "../../contexts/userContext";

import { Logo, ThemeModeSwitch } from "../../components";
import Navigation from "./Navigation";
import WeightChart from "./WeightChart";
import AccountSettings from "../TopBar/AccountSettings";
import TemporaryDrawer from "./MenuDrawer";

import { Role } from "../../shared/enums";

import {
  SectionContainer,
  LeftBarContainer,
  MenuDrawerBox,
  AccountSettingsBox,
  NavigationContainer,
  ThemeSwitchContainer,
} from "./LeftBar.styles";

const LeftBar: React.FC = () => {
  const { user } = useUserContext();

  return (
    <SectionContainer>
      <LeftBarContainer>
        <MenuDrawerBox>
          <TemporaryDrawer />
        </MenuDrawerBox>
        <Logo />
        <AccountSettingsBox>
          <AccountSettings image={user?.image!} />
        </AccountSettingsBox>
        {user?.role === Role.user ? <WeightChart /> : null}
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
