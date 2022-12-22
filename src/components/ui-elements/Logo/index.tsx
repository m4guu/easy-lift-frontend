import React from "react";

import { styled } from "@mui/system";

import logo from "../../../assets/images/logo/logo-dark-mode.svg";

const Logo: React.FC = () => {
  return <LogoImage src={logo} alt="EasyLift Logo" />;
};

const LogoImage = styled("img")({
  width: "80%",
});
export default Logo;
