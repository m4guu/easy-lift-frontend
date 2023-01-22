import React from "react";

import styled from "@mui/system/styled";

import { useGetUserRole } from "../../../../store/redux-store/slices/user/user.hooks";

import { Role } from "../../../../shared/enums";

import { YoursProgramsList } from "./YoursProgramsList";
import { YourWorkoutList } from "./YoursWorkoutList";
import { SectionHeader } from "../../../../components";

export const YoursSection: React.FC = () => {
  const { role } = useGetUserRole();

  return (
    <SectionContainer>
      <SectionHeader>
        yours {role === Role.user ? "workouts" : "programs"}
      </SectionHeader>
      {role === Role.user ? <YourWorkoutList /> : <YoursProgramsList />}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    width: "100%",
  },
}));
