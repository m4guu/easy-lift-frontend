import React from "react";
import { Link } from "react-router-dom";

import { styled } from "@mui/system";

import { useIsDarkMode } from "../../store/redux-store/slices/themeMode/themeMode.hooks";

import logoDarkMode from "../../assets/images/logo/logo-dark-mode.svg";
import logoLightMode from "../../assets/images/logo/logo-light-mode.svg";
import { PATHS } from "../../pages/paths";

const Logo: React.FC = () => {
  const isDarkMode = useIsDarkMode();

  const logo = isDarkMode ? logoDarkMode : logoLightMode;

  return (
    <HomeLink to={PATHS.default}>
      <LogoImage src={logo} alt="EasyLift" />
    </HomeLink>
  );
};

const HomeLink = styled(Link)(({ theme }) => ({
  width: "175.8px",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: theme.spacing(1.6),
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

const LogoImage = styled("img")({
  width: "100%",
});
export default Logo;
