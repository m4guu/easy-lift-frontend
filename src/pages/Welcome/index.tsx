import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import { PATHS } from "../paths";
import logo from "../../assets/images/logo/mini_logo_yellow.svg";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <WelcomePageContainer>
      <LogoImage src={logo} alt="Logo EasyLift" />
      <Typography variant="h3">Welcom to EasyLift</Typography>
      <Typography variant="h3">
        Log in with your EasyLift account to continue
      </Typography>

      <StartButton
        onClick={() => navigate(PATHS.AUTH)}
        variant="contained"
        size="small"
        endIcon={<PlayCircleOutlineIcon />}
      >
        Start
      </StartButton>
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
  alignItems: "center",
  flexDirection: "column",
  gap: "1rem",
});

const StartButton = styled(Button)({
  width: "60%",
});

const LogoImage = styled("img")({
  width: "15%",
  marginLeft: "auto",
  marginRight: "auto",
});

const Welcome = WelcomePage;
export default Welcome;
