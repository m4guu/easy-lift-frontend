import React, { useState } from "react";

import { Box, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/system";

import { SectionContainer, MediaFooter, Logo } from "../../components";
import { AuthForm } from "./views/AuthForm/AuthForm";
import { AuthTypes } from "../../shared/enums";

const AuthPage: React.FC = () => {
  const [value, setValue] = useState(0);
  const authType = value === 0 ? AuthTypes.LOGIN : AuthTypes.SIGN_UP;

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <SectionContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <SectionContent>
        <Tabs value={value} onChange={handleChange} orientation="vertical">
          <StyledTab label="login" />
          <StyledTab label="signup" />
        </Tabs>

        <AuthForm authType={authType} />
      </SectionContent>

      <MediaFooter />
    </SectionContainer>
  );
};

const SectionContent = styled(Box)(({ theme }) => ({
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -60%)",
  alignItems: "center",
  gap: theme.spacing(2),
}));

const LogoWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  width: "10%",
  marginLeft: "auto",
  marginRight: "auto",
  [theme.breakpoints.down("xl")]: {
    width: "20%",
  },
  [theme.breakpoints.down("lg")]: {
    width: "55%",
  },

  [theme.breakpoints.down("sm")]: {
    width: "80%",
  },
}));
const StyledTab = styled(Tab)({});

const Auth = AuthPage;
export default Auth;
