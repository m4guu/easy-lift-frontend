import React from "react";

import { Box, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { styled } from "@mui/system";

import { useAppDispatch } from "../../store/redux-store/hooks";
import { login } from "../../store/redux-store/slices/user/user.slice";

import logo from "../../assets/images/logo/mini_logo_yellow.svg";
import { DUMMY_LOGIN_STATE } from "./constans";

const WelcomePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const loginHandle = () => {
    dispatch(login(DUMMY_LOGIN_STATE));
  };

  return (
    <WelcomePageContainer>
      <LogoImage src={logo} alt="Logo EasyLift" />
      <Typography variant="h3">Welcom to EasyLift</Typography>
      <Typography variant="h3">
        Log in with your EasyLift account to continue
      </Typography>
      <ButtonBox>
        <LoadingButton
          onClick={() => loginHandle()}
          variant="outlined"
          size="small"
        >
          Log in
        </LoadingButton>
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
