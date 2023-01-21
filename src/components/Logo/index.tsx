import React from "react";

import { styled } from "@mui/system";

import { useIsDarkMode } from "../../store/redux-store/slices/themeMode/themeMode.hooks";

import logoDarkMode from "../../assets/images/logo/logo-dark-mode.svg";
import logoLightMode from "../../assets/images/logo/logo-light-mode.svg";

const Logo: React.FC = () => {
  const isDarkMode = useIsDarkMode();

  const logo = isDarkMode ? logoDarkMode : logoLightMode;

  return <LogoImage src={logo} alt="EasyLift" />;
};

const LogoImage = styled("img")(({ theme }) => ({
  width: "80%",
  [theme.breakpoints.down("lg")]: {
    width: "30% ",
  },
  [theme.breakpoints.down("md")]: {
    width: "40% ",
  },
}));
export default Logo;
