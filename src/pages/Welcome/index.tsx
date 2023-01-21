import React from "react";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

import logo from "../../assets/images/logo/mini_logo_yellow.svg";

const WelcomePage: React.FC = () => {
  return (
    <WelcomePageContainer>
      <LogoImage src={logo} alt="Logo EasyLift" />
      <Typography variant="h3">Welcom to EasyLift</Typography>
      <Typography variant="h3">
        Log in with your EasyLift account to continue
      </Typography>
      <ButtonBox>
        <Button variant="outlined" size="small">
          Log in
        </Button>
        <Button variant="contained" size="small">
          Sign up
        </Button>
      </ButtonBox>
    </WelcomePageContainer>
  );
};

const WelcomePageContainer = styled(Box)({
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -60%)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const ButtonBox = styled(Box)({
  display: "flex",
  gap: "1rem",
  justifyContent: "center",
});

const LogoImage = styled("img")({
  width: "15%",
  marginLeft: "auto",
  marginRight: "auto",
});

const Welcome = WelcomePage;
export default Welcome;
