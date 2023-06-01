import React from "react";

import { Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { Logo } from "../../components";
import { Role } from "../../shared/enums";
import { TrainerConfigurationForm } from "./views/ConfigurationForm/TrainerConfigurationForm";
import { UserConfigurationForm } from "./views/ConfigurationForm/UserConfigurationForm";

const ConfigurationPage: React.FC = () => {
  const { user } = useUserContext();
  return (
    <SectionContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <SectionContent>
        <NoPaddingDivider />
        {user?.role === Role.user ? (
          <UserConfigurationForm />
        ) : (
          <TrainerConfigurationForm />
        )}
      </SectionContent>
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

const LogoWrapper = styled(Box)({
  textAlign: "center",
  width: "12rem",
  marginLeft: "auto",
  marginRight: "auto",
});

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)} ${theme.spacing(2)} -${theme.spacing(2)}`,
}));

const Configuration = ConfigurationPage;
export default Configuration;
