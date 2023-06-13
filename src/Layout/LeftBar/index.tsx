import React from "react";

import { useUserContext } from "../../contexts/userContext";

import { Role } from "../../shared/enums";
import { API_URL } from "../../config/env.config";

import {
  SectionContainer,
  LeftBarContainer,
  MenuDrawerBox,
  AccountSettingsBox,
  NavigationContainer,
  ThemeSwitchContainer,
  LogoWrapper,
} from "./LeftBar.styles";
import Navigation from "./Navigation";
import AccountSettings from "../TopBar/AccountSettings";
import TemporaryDrawer from "./MenuDrawer";
import { TrainingCalendar } from "./TrainingCalendar/TrainingCalendar";
import { Logo, ThemeModeSwitch } from "../../components";

const LeftBar: React.FC = () => {
  const { user } = useUserContext();

  return (
    <SectionContainer>
      <LeftBarContainer>
        <MenuDrawerBox>
          <TemporaryDrawer />
        </MenuDrawerBox>

        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        <AccountSettingsBox>
          <AccountSettings image={`${API_URL}${user!.image}`} />
        </AccountSettingsBox>

        {user?.role === Role.user && <TrainingCalendar />}

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
