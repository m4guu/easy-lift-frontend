import React from "react";

import { Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { UserConfigurationForm } from "./views/ConfigurationForm/UserConfigurationForm";
import { SectionContainer, Logo, SectionHeader } from "../../components";
import { Role } from "../../shared/enums";
import TrainerConfigurationForm from "./views/ConfigurationForm/TrainerConfigurationForm";

const ConfigurationPage: React.FC = () => {
  const { user } = useUserContext();
  return (
    <SectionContainer>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>

      <SectionContent>
        <SectionHeader>configuration</SectionHeader>
        <Divider />
        {user?.role === Role.user ? (
          <UserConfigurationForm />
        ) : (
          <TrainerConfigurationForm />
        )}
      </SectionContent>
    </SectionContainer>
  );
};

const SectionContent = styled(Box)(({ theme }) => ({
  textAlign: "center",
  flexDirection: "column",
  width: "100%",
  marginTop: theme.spacing(2),
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
    width: "100%",
  },
}));
const Configuration = ConfigurationPage;
export default Configuration;
