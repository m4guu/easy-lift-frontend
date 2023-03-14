import React from "react";

import styled from "@mui/system/styled";

import { useUserContext } from "../../../../contexts/userContext";

import { Role } from "../../../../shared/enums";

import { YoursProgramsList } from "./YoursProgramsList";
import { YourWorkoutList } from "./YoursWorkoutList";
import { SectionHeader } from "../../../../components";

export const YoursSection: React.FC = () => {
  const { user } = useUserContext();

  return (
    <SectionContainer>
      <SectionHeader>
        yours {user?.role === Role.user ? "workouts" : "programs"}
      </SectionHeader>
      {user?.role === Role.user ? <YourWorkoutList /> : <YoursProgramsList />}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  padding: theme.spacing(2),
  width: "100%",
}));
