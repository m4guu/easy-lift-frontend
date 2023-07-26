import React from "react";

import { Box, Divider, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import LogoutIcon from "@mui/icons-material/Logout";

import { useUserContext } from "../../contexts/userContext";

import { Logo } from "../../components";
import { TrainerConfigurationForm } from "./views/ConfigurationForm/TrainerConfigurationForm";
import { UserConfigurationForm } from "./views/ConfigurationForm/UserConfigurationForm";
import { Role } from "../../shared/enums";

const ConfigurationPage: React.FC = () => {
  const { user, logout } = useUserContext();

  return (
    <SectionContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <NoPaddingDivider />
      <SectionContent>
        {user?.role === Role.user ? (
          <UserConfigFormContainer>
            <UserConfigurationForm />
          </UserConfigFormContainer>
        ) : (
          <TrainerConfigurationForm />
        )}
      </SectionContent>
      <Logout onClick={logout}>
        <LogoutIcon color="primary" />
      </Logout>
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  height: "100vh",
}));

const SectionContent = styled(Box)({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  textAlign: "center",
});

const UserConfigFormContainer = styled(Box)({
  minWidth: "25rem",
  marginLeft: "auto",
  marginRight: "auto",
});

const LogoWrapper = styled(Box)({
  textAlign: "center",
  width: "12rem",
  marginLeft: "auto",
  marginRight: "auto",
});

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)} ${theme.spacing(2)} -${theme.spacing(2)}`,
}));

const Logout = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  zIndex: 1000,
  right: theme.spacing(1),
  top: theme.spacing(1),
}));

const Configuration = ConfigurationPage;
export default Configuration;
