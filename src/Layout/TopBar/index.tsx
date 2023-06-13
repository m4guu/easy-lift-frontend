import React from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

import { useUserContext } from "../../contexts/userContext";

import { PATHS } from "../../pages/paths";
import { Role } from "../../shared/enums";
import { VITE_INTERNAL_API_URL } from "../../config/env.config";

import AccountSettings from "./AccountSettings";

const TopBar: React.FC = () => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  const buttonText =
    user?.role === Role.user ? "start training" : "create new program";
  const buttonLink =
    user?.role === Role.user ? PATHS.NEW_WORKOUT : PATHS.NEW_PROGRAM;

  return (
    <TopBarSectionContainer>
      <Content>
        <Button
          onClick={() => navigate(buttonLink)}
          variant="contained"
          startIcon={<AddIcon />}
        >
          {buttonText}
        </Button>
        <AccountSettingsBox>
          <AccountSettings image={`${VITE_INTERNAL_API_URL}${user!.image}`} />
        </AccountSettingsBox>
      </Content>
    </TopBarSectionContainer>
  );
};

const TopBarSectionContainer = styled("section")({});

const Content = styled(Box)(({ theme }) => ({
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "right",
  gap: "1rem",
  height: "100%",
  borderBottom: `solid thin ${theme.palette.others.border_color}`,
  [theme.breakpoints.down("lg")]: {
    height: "inherit",
    borderTop: `solid thin ${theme.palette.others.border_color}`,
    justifyContent: "space-around",
    padding: theme.spacing(1.5),
  },
}));

const AccountSettingsBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));
export default TopBar;
