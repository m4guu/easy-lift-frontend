import React from "react";

import { useUserContext } from "../../contexts/userContext";

import { Role } from "../../shared/enums";

import {
  SectionContainer,
  LeftBarContainer,
  MenuDrawerBox,
  AccountSettingsBox,
  NavigationContainer,
  ThemeSwitchContainer,
} from "./LeftBar.styles";
import Navigation from "./Navigation";
import AccountSettings from "../TopBar/AccountSettings";
import TemporaryDrawer from "./MenuDrawer";
import { TrainingCalendar } from "./TrainingCalendar/TrainingCalendar";
import { Logo, ThemeModeSwitch } from "../../components";

import DUMMY_USER_IMG from "../../assets/images/DUMMY_PROFILE_IMG/profile-img-id.jpeg";

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
          <AccountSettings image={DUMMY_USER_IMG} />
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
