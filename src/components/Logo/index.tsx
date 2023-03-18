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
  width: "175.8px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: theme.spacing(2.5),
  [theme.breakpoints.down("lg")]: {
    width: "19% ",
    padding: 0,
  },
  [theme.breakpoints.down("md")]: {
    width: "25% ",
  },
  [theme.breakpoints.down("sm")]: {
    width: "32% ",
  },
}));
export default Logo;
