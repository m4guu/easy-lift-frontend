import React from "react";

import { Typography } from "@mui/material";
import styled from "@mui/system/styled";

import YourWorkoutList from "./YoursWorkoutList";

import { useGetUserRole } from "../../../../store/redux-store/slices/user/user.hooks";

import { Role } from "../../../../shared/enums";
import YoursProgramsList from "./YoursProgramsList";

const YoursSection: React.FC = () => {
  const { role } = useGetUserRole();

  return (
    <SectionContainer>
      <SectionHeader>
        <Typography variant="caption">
          yours {role === Role.user ? "workouts" : "programs"}
        </Typography>
      </SectionHeader>
      {role === Role.user ? <YourWorkoutList /> : <YoursProgramsList />}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));
const SectionHeader = styled("header")(({ theme }) => ({
  paddingBottom: theme.spacing(1),
}));
export default YoursSection;
