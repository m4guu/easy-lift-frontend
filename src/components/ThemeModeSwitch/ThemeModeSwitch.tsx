import React, { memo } from "react";

// eslint-disable-next-line import/no-extraneous-dependencies
import { styled } from "@mui/system";
import { Switch } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useAppDispatch, useAppSelector } from "../../hooks/useContext";
import { themeAction } from "../../contexts/store/slices/themeModeSlice";

const ThemeModeSwitchComponent: React.FC = () => {
  const isDarkMode = useAppSelector((state) => state.themeMode.isDarkMode);
  const dispatch = useAppDispatch();

  return (
    <Content>
      <LightModeIcon
        color={`${isDarkMode ? "action" : "primary"}`}
        fontSize="small"
      />
      <Switch
        checked={isDarkMode}
        onChange={() => dispatch(themeAction.toggleThemeMode())}
        name="theme"
      />
      <DarkModeIcon
        color={`${isDarkMode ? "primary" : "action"}`}
        fontSize="small"
      />
    </Content>
  );
};

const Content = styled("div")({
  display: "flex",
  alignItems: "center",
});

const ThemeModeSwitch = memo(ThemeModeSwitchComponent);

export default ThemeModeSwitch;
