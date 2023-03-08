import React from "react";

import { Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

import { useUserContext } from "../../contexts/userContext";

import { UserConfigurationForm } from "./views/ConfigurationForm/UserConfigurationForm";
import { Logo, SectionHeader } from "../../components";
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
        {/* <SectionHeader>configuration</SectionHeader> */}
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

const NoPaddingDivider = styled(Divider)(({ theme }) => ({
  margin: `0 -${theme.spacing(2)} ${theme.spacing(2)} -${theme.spacing(2)}`,
}));

const Configuration = ConfigurationPage;
export default Configuration;
