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
      {user?.role === Role.user && <YourWorkoutList userId={user.id} />}
      {user?.role === Role.trainer && <YoursProgramsList userId={user.id} />}
    </SectionContainer>
  );
};

const SectionContainer = styled("section")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: theme.spacing(2),
  width: "100%",
}));
