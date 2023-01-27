import React from "react";

import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate } from "react-router-dom";
import { PATHS } from "../../pages/paths";

import { useGetUserRoleAndImage } from "../../store/redux-store/slices/user/user.hooks";

import { Role } from "../../shared/enums";

import AccountSettings from "./AccountSettings";

const TopBar: React.FC = () => {
  const { role, image } = useGetUserRoleAndImage();
  const navigate = useNavigate();

  const buttonText =
    role === Role.user ? "start training" : "create new program";
  const buttonLink = role === Role.user ? PATHS.NEW_WORKOUT : PATHS.NEW_PROGRAM;

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
          <AccountSettings image={image} />
        </AccountSettingsBox>
      </Content>
    </TopBarSectionContainer>
  );
};

const TopBarSectionContainer = styled("section")({});

const Content = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
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
